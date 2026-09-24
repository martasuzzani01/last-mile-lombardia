(function(){
  "use strict";

  var EMISSION_KG_PER_KM = 1.0;
  var FALLBACK_ROUTE_FACTOR = 1.3; // used only if OSRM is unreachable
  var BUFFER_KM = 15;
  var OSRM_URL = "https://router.project-osrm.org/route/v1/driving/";
  var LON_REF = 9.8, LAT_REF = 45.6;
  var KM_PER_LAT = 111.32;
  var KM_PER_LON = 111.32 * Math.cos(LAT_REF * Math.PI/180);

  /* ============ GEO HELPERS ============ */
  function toKm(lat, lon){ return { x:(lon-LON_REF)*KM_PER_LON, y:(lat-LAT_REF)*KM_PER_LAT }; }
  function haversineKm(a,b){
    var R=6371, dLat=(b.lat-a.lat)*Math.PI/180, dLon=(b.lon-a.lon)*Math.PI/180;
    var la1=a.lat*Math.PI/180, la2=b.lat*Math.PI/180;
    var h=Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(la1)*Math.cos(la2)*Math.sin(dLon/2)*Math.sin(dLon/2);
    return 2*R*Math.asin(Math.sqrt(h));
  }
  function pointSegDistKm(p, aLat, aLon, bLat, bLon){
    var P=toKm(p.lat,p.lon), A=toKm(aLat,aLon), B=toKm(bLat,bLon);
    var vx=B.x-A.x, vy=B.y-A.y;
    var len2 = vx*vx+vy*vy;
    var t = len2===0 ? 0 : ((P.x-A.x)*vx + (P.y-A.y)*vy)/len2;
    t = Math.max(0, Math.min(1, t));
    var cx = A.x + t*vx, cy = A.y + t*vy;
    return Math.sqrt((P.x-cx)*(P.x-cx) + (P.y-cy)*(P.y-cy));
  }
  function pointToPolylineDistKm(p, coordsLonLat){
    var min = Infinity;
    for (var i=0; i<coordsLonLat.length-1; i++){
      var a = coordsLonLat[i], b = coordsLonLat[i+1];
      var d = pointSegDistKm(p, a[1], a[0], b[1], b[0]);
      if (d < min) min = d;
    }
    return min;
  }

  /* ============ MAP ============ */
  var map = L.map("map", { scrollWheelZoom:false }).setView([45.55, 9.7], 8);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map);
  map.on("focus", function(){ map.scrollWheelZoom.enable(); });
  map.on("blur", function(){ map.scrollWheelZoom.disable(); });

  function hubIcon(h){
    var cls = "hub-marker" + (h.status==="future" ? " future" : "");
    return L.divIcon({ className:"", html:'<div class="'+cls+'" data-id="'+h.id+'"></div>', iconSize:[16,16] });
  }
  function cityIconEl(c){
    return L.divIcon({ className:"", html:'<div class="city-marker" data-id="'+c.id+'"></div>', iconSize:[14,14] });
  }

  var hubMarkers = {}, cityMarkers = {};
  var bufferLayer = L.layerGroup().addTo(map);
  var routeLayer = L.layerGroup().addTo(map);

  HUBS.forEach(function(h){
    var m = L.marker([h.lat, h.lon], { icon: hubIcon(h) }).addTo(map);
    var srcLabel = h.status==="future" ? "Under construction — " : "";
    m.bindPopup(
      "<b>" + h.name + "</b><br>" + h.comune + " (" + h.prov + ") &middot; " + srcLabel + h.scale +
      "<br>" + h.sizeNote + (h.year ? " &middot; " + h.year : "") +
      "<br><a href=\"" + h.source + "\" target=\"_blank\" rel=\"noopener\">source &rarr;</a>"
    );
    hubMarkers[h.id] = m;
  });
  DESTINATIONS.forEach(function(c){
    var m = L.marker([c.lat, c.lon], { icon: cityIconEl(c) }).addTo(map);
    m.bindTooltip(c.name, { direction:"top", offset:[0,-4] });
    cityMarkers[c.id] = m;
  });

  /* ============ SELECTS ============ */
  var originSelect = document.getElementById("originSelect");
  var destSelect = document.getElementById("destSelect");
  HUBS.forEach(function(h){
    var o = document.createElement("option");
    o.value = h.id;
    o.textContent = h.name + " — " + h.comune + " (" + h.prov + ")" + (h.status==="future" ? " · under construction" : "");
    originSelect.appendChild(o);
  });
  DESTINATIONS.forEach(function(c){
    var o = document.createElement("option");
    o.value = c.id; o.textContent = c.name;
    destSelect.appendChild(o);
  });
  originSelect.value = "amazon_uit7";
  destSelect.value = "bergamo";

  function byId(list, id){ return list.filter(function(x){return x.id===id;})[0]; }

  function updateSelection(){
    HUBS.forEach(function(h){
      var el = hubMarkers[h.id].getElement();
      var inner = el ? el.querySelector(".hub-marker") : null;
      if (inner) inner.classList.toggle("selected", h.id===originSelect.value);
    });
    DESTINATIONS.forEach(function(c){
      var el = cityMarkers[c.id].getElement();
      var inner = el ? el.querySelector(".city-marker") : null;
      if (inner) inner.classList.toggle("selected", c.id===destSelect.value);
    });
  }
  originSelect.addEventListener("change", updateSelection);
  destSelect.addEventListener("change", updateSelection);
  map.whenReady(updateSelection);

  /* ============ EXPOSURE MODEL ============ */
  function scaleWeight(s){ return s==="large" ? 3 : s==="medium" ? 2 : 1; }
  function scoreToLabel(score){
    if (score >= 2.4) return "very-high";
    if (score >= 1.7) return "high";
    if (score >= 1.0) return "medium";
    return "low";
  }
  function labelText(l){
    return l==="very-high" ? "Very high" : l==="high" ? "High" : l==="medium" ? "Medium" : "Low";
  }
  function socioLine(h){
    var parts = [];
    if (h.income != null){
      parts.push("average income (" + h.incomeType + "): €" + h.income.toLocaleString("en-US") + " (" + h.incomeYear + ")");
    }
    if (h.ivsm != null){
      parts.push("ISTAT IVSM: " + h.ivsm + " (" + h.ivsmYear + ")");
    }
    if (!parts.length) return '<span class="na">not available</span>';
    return parts.join("<br>");
  }

  /* ============ ROUTING (OSRM) + SIMULATION ============ */
  var statusEl = document.getElementById("routingStatus");
  var btn = document.getElementById("simulateBtn");

  function fetchRoute(origin, dest){
    var url = OSRM_URL + origin.lon + "," + origin.lat + ";" + dest.lon + "," + dest.lat + "?overview=full&geometries=geojson";
    return fetch(url).then(function(r){
      if (!r.ok) throw new Error("OSRM HTTP " + r.status);
      return r.json();
    }).then(function(data){
      if (!data.routes || !data.routes.length) throw new Error("no route returned");
      return data.routes[0];
    });
  }

  function runSimulation(){
    var origin = byId(HUBS, originSelect.value);
    var dest = byId(DESTINATIONS, destSelect.value);
    if (!origin || !dest) return;

    btn.disabled = true;
    statusEl.textContent = "Calculating the real route via OSRM…";
    statusEl.classList.remove("err");

    fetchRoute(origin, dest).then(function(route){
      statusEl.textContent = "Route calculated by OSRM (OpenStreetMap data).";
      renderResult(origin, dest, route.distance/1000, route.duration, route.geometry.coordinates, true);
    }).catch(function(err){
      statusEl.textContent = "OSRM unreachable (" + err.message + ") — using a fallback straight-line estimate × 1.3.";
      statusEl.classList.add("err");
      var straight = haversineKm(origin, dest);
      var fallbackKm = straight * FALLBACK_ROUTE_FACTOR;
      renderResult(origin, dest, fallbackKm, null, [[origin.lon,origin.lat],[dest.lon,dest.lat]], false);
    }).finally(function(){ btn.disabled = false; });
  }

  function fmtDuration(sec){
    if (sec == null) return "n/a";
    var h = Math.floor(sec/3600), m = Math.round((sec%3600)/60);
    return (h>0 ? h+"h " : "") + m + "min";
  }

  function renderResult(origin, dest, distanceKm, durationSec, coords, isReal){
    routeLayer.clearLayers();
    bufferLayer.clearLayers();

    var latlngs = coords.map(function(c){ return [c[1], c[0]]; });
    L.polyline(latlngs, { color: getComputedStyle(document.body).getPropertyValue("--route").trim() || "#2a78d6", weight:4, opacity:0.85 }).addTo(routeLayer);
    map.fitBounds(L.latLngBounds(latlngs), { padding:[28,28] });

    var impacted = HUBS.map(function(h){
      var dist = pointToPolylineDistKm(h, coords);
      return { hub:h, dist:dist };
    }).filter(function(r){ return r.dist <= BUFFER_KM; })
      .map(function(r){
        var proximity = 1 - (r.dist/BUFFER_KM)*0.6;
        var score = scaleWeight(r.hub.scale) * proximity;
        return { hub:r.hub, dist:r.dist, score:score, label:scoreToLabel(score) };
      })
      .sort(function(a,b){ return b.score-a.score; });

    impacted.forEach(function(r){
      L.circle([r.hub.lat, r.hub.lon], { radius:15000, color:"transparent",
        fillColor:getComputedStyle(document.body).getPropertyValue("--route").trim() || "#2a78d6", fillOpacity:0.08 }).addTo(bufferLayer);
    });

    HUBS.forEach(function(h){
      var el = hubMarkers[h.id].getElement();
      var inner = el ? el.querySelector(".hub-marker") : null;
      if (inner) inner.classList.toggle("impacted", impacted.some(function(r){ return r.hub.id===h.id; }));
    });
    updateSelection();

    var co2Kg = distanceKm * EMISSION_KG_PER_KM;
    document.getElementById("statDistance").innerHTML = distanceKm.toFixed(1) + "<small> km</small>";
    document.getElementById("statDistanceSub").textContent = isReal ? "real road route (OSRM)" : "fallback estimate (OSRM unreachable)";
    document.getElementById("statDuration").textContent = fmtDuration(durationSec);
    document.getElementById("statCO2").innerHTML = co2Kg.toFixed(0) + "<small> kg</small>";
    var carEquivKm = (co2Kg*1000/120).toFixed(0);
    document.getElementById("statCO2Sub").textContent = "≈ " + carEquivKm + " km by car, for comparison";
    document.getElementById("statZones").textContent = impacted.length;

    var body = document.getElementById("impactBody");
    body.innerHTML = "";
    if (!impacted.length){
      body.innerHTML = '<tr><td colspan="5"><div class="empty-state">No mapped logistics hub falls within 15 km of this route.</div></td></tr>';
    } else {
      impacted.forEach(function(r){
        var tr = document.createElement("tr");
        tr.innerHTML =
          "<td>" + r.hub.name + (r.hub.status==="future" ? ' <span class="chip medium" style="margin-left:4px;">under construction</span>' : "") +
            "<div class=\"src\"><a href=\"" + r.hub.source + "\" target=\"_blank\" rel=\"noopener\">source</a> · " + r.hub.sizeNote + "</div></td>" +
          "<td>" + r.hub.comune + " <span class=\"mono\" style=\"color:var(--ink-muted);font-size:11px;\">· " + r.hub.prov + "</span></td>" +
          "<td class=\"mono\">" + r.dist.toFixed(1) + " km</td>" +
          "<td style=\"font-size:12px;\">" + socioLine(r.hub) + "</td>" +
          "<td><span class=\"chip " + r.label + "\">" + labelText(r.label) + "</span></td>";
        body.appendChild(tr);
      });
    }
  }

  document.getElementById("simulateBtn").addEventListener("click", runSimulation);
  document.getElementById("resetBtn").addEventListener("click", function(){
    routeLayer.clearLayers();
    bufferLayer.clearLayers();
    HUBS.forEach(function(h){
      var el = hubMarkers[h.id].getElement();
      var inner = el ? el.querySelector(".hub-marker") : null;
      if (inner) inner.classList.remove("impacted");
    });
    statusEl.textContent = "";
    statusEl.classList.remove("err");
    ["statDistance","statCO2"].forEach(function(id){ document.getElementById(id).innerHTML = "—"; });
    document.getElementById("statDuration").textContent = "—";
    document.getElementById("statZones").textContent = "—";
    document.getElementById("statDistanceSub").textContent = "road route (OSRM)";
    document.getElementById("statCO2Sub").textContent = "one vehicle, one way · estimate";
    document.getElementById("impactBody").innerHTML = '<tr><td colspan="5"><div class="empty-state">Select an origin and destination, then click "Simulate route" to calculate the real route.</div></td></tr>';
  });

  /* ============ TOOLTIP (charts) ============ */
  var tip = document.getElementById("tooltip");
  function showTip(ev, html){ tip.innerHTML = html; tip.classList.add("show"); moveTip(ev); }
  function moveTip(ev){
    var x = ev.clientX, y = ev.clientY;
    tip.style.left = Math.min(x+14, window.innerWidth-240) + "px";
    tip.style.top = (y+16) + "px";
  }
  function hideTip(){ tip.classList.remove("show"); }

  /* ============ AIR QUALITY CHART ============ */
  function chartAir(){
    var svg = document.getElementById("chartAir");
    var W=860, H=300, padL=210, padR=40, padT=14, padB=14;
    var maxV = Math.max(EU_NO2_LIMIT_CURRENT, Math.max.apply(null, AIR_STATIONS_NO2_2024.map(function(s){return s.value;}))) * 1.12;
    var barH = (H-padT-padB) / AIR_STATIONS_NO2_2024.length;
    var maxBarW = W-padL-padR;
    function X(v){ return padL + (v/maxV)*maxBarW; }

    var ramp = ["#9ec5f4","#6da7ec","#3987e5","#2a78d6","#1c5cab","#184f95"];
    function colorFor(v){
      var t = v/maxV;
      var idx = Math.min(ramp.length-1, Math.floor(t*ramp.length));
      return ramp[idx];
    }

    var g = "";
    AIR_STATIONS_NO2_2024.forEach(function(s,i){
      var y = padT + i*barH + barH*0.18;
      var bh = barH*0.64;
      var w = X(s.value) - padL;
      g += '<text x="'+(padL-10)+'" y="'+(y+bh/2+4).toFixed(1)+'" text-anchor="end" class="bar-label">'+s.name+'</text>';
      g += '<rect x="'+padL+'" y="'+y.toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+bh.toFixed(1)+'" rx="3" fill="'+colorFor(s.value)+'" class="chart-bar" data-name="'+s.name+'" data-v="'+s.value+'"/>';
      g += '<text x="'+(padL+w+8).toFixed(1)+'" y="'+(y+bh/2+4).toFixed(1)+'" class="bar-label">'+s.value+'</text>';
    });
    g += '<line x1="'+X(EU_NO2_LIMIT_CURRENT).toFixed(1)+'" y1="'+padT+'" x2="'+X(EU_NO2_LIMIT_CURRENT).toFixed(1)+'" y2="'+(H-padB)+'" class="limit-line"/>';
    g += '<text x="'+X(EU_NO2_LIMIT_CURRENT).toFixed(1)+'" y="'+(padT-2)+'" text-anchor="middle" class="axis-tick" fill="var(--critical)">2024 limit: 40</text>';
    g += '<line x1="'+X(EU_NO2_LIMIT_2030).toFixed(1)+'" y1="'+padT+'" x2="'+X(EU_NO2_LIMIT_2030).toFixed(1)+'" y2="'+(H-padB)+'" class="limit-line future"/>';
    g += '<text x="'+X(EU_NO2_LIMIT_2030).toFixed(1)+'" y="'+(H-2)+'" text-anchor="middle" class="axis-tick" fill="var(--warning)">2030 limit: 20</text>';

    svg.innerHTML = g;
    svg.querySelectorAll(".chart-bar").forEach(function(bar){
      bar.style.cursor = "pointer";
      bar.addEventListener("mouseenter", function(ev){
        var extra = "";
        AIR_STATIONS_NO2_2024.forEach(function(s){ if (s.name===bar.getAttribute("data-name") && s.note) extra = "<br>" + s.note; });
        showTip(ev, bar.getAttribute("data-name") + "<br>NO₂: " + bar.getAttribute("data-v") + " µg/m³ (2024 average)" + extra);
      });
      bar.addEventListener("mousemove", moveTip);
      bar.addEventListener("mouseleave", hideTip);
    });

    var tbody = document.querySelector("#airTable tbody");
    tbody.innerHTML = "";
    AIR_STATIONS_NO2_2024.forEach(function(s){
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>"+s.name+"</td><td>"+s.value+"</td>";
      tbody.appendChild(tr);
    });
  }

  /* ============ SOURCES LIST ============ */
  function renderSources(){
    var ul = document.getElementById("hubSources");
    ul.innerHTML = "";
    HUB_SOURCES.forEach(function(s){
      var li = document.createElement("li");
      li.innerHTML = '<a href="'+s.url+'" target="_blank" rel="noopener">'+s.label+'</a>';
      ul.appendChild(li);
    });
  }

  /* ============ INIT ============ */
  chartAir();
  renderSources();
})();

