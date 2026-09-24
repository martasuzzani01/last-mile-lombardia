/* ============================================================
   Last Mile — dataset
   Every numeric value cites its source in "source" or the
   *Source fields. "not specified" / null = no figure found
   during the research (nothing invented). See also README.md.
   ============================================================ */

var HUBS = [
  { id:"amazon_lin8", name:"Amazon \"LIN8\" — sorting center", comune:"Casirate d'Adda", prov:"BG",
    lat:45.5194, lon:9.5658, coordNote:"municipality (address: via Gioacchino Rossini)",
    scale:"large", sizeNote:"not specified", year:"2018–2019", status:"active",
    source:"https://amazon-press.it/Top-Navi/Comunicati-Stampa/Pressedetail/amazon/it/2018-11-05-LIN8/",
    ivsm:null, ivsmYear:null, income:null, incomeType:null, incomeYear:null, incomeSource:null },

  { id:"amazon_bgy1", name:"Amazon \"BGY1\" — fulfillment center", comune:"Cividate al Piano", prov:"BG",
    lat:45.5972, lon:9.7889, coordNote:"municipality (address: via I Maggio 8)",
    scale:"large", sizeNote:"not specified", year:"not specified", status:"active",
    source:"https://www.adecco-jobs.com/amazon/it-it/centri-amazon/lombardia",
    ivsm:null, ivsmYear:null, income:13510, incomeType:"per capita", incomeYear:"~2016", incomeSource:"https://www.comuni-italiani.it/016/076/statistiche/classifiche.html" },

  { id:"amazon_dlo2", name:"Amazon \"DLO2\" — sorting depot", comune:"Origgio", prov:"VA",
    lat:45.6156, lon:9.0742, coordNote:"municipality (address: via Bruno Buozzi)",
    scale:"medium", sizeNote:"8,000 m²", year:"2016", status:"active",
    source:"https://www.varesenews.it/2016/10/amazon-apre-a-origgio-e-porta-20-nuovi-posti-di-lavoro/558998/",
    ivsm:96.7, ivsmYear:2011, income:null, incomeType:null, incomeYear:null, incomeSource:null },

  { id:"amazon_dlo5", name:"Amazon \"DLO5\" — sorting depot", comune:"Castegnato", prov:"BS",
    lat:45.5794, lon:10.1275, coordNote:"municipality (exact address not found)",
    scale:"medium", sizeNote:"> 8,000 m²", year:"2020", status:"active",
    source:"https://www.bsnews.it/2020/05/18/amazon-apre-centro-distribuzione-a-castegnato-dara-lavoro-a-100-persone/",
    ivsm:null, ivsmYear:null, income:null, incomeType:null, incomeYear:null, incomeSource:null },

  { id:"amazon_xmp2", name:"Amazon \"XMP2\"", comune:"Carpiano", prov:"MI",
    lat:45.3386, lon:9.3014, coordNote:"municipality (address: via Aldo Moro 4)",
    scale:"large", sizeNote:"not specified", year:"not specified", status:"active",
    source:"https://gazzettalogistica.it/centri-logistici-amazon-in-italia/",
    ivsm:null, ivsmYear:null, income:null, incomeType:null, incomeYear:null, incomeSource:null },

  { id:"amazon_xli8", name:"Amazon \"XLI8 / PITC\"", comune:"Somaglia", prov:"LO",
    lat:45.1500, lon:9.6167, coordNote:"municipality (address: SS Mantovana 234)",
    scale:"medium", sizeNote:"not specified", year:"not specified", status:"active",
    source:"https://gazzettalogistica.it/centri-logistici-amazon-in-italia/",
    ivsm:null, ivsmYear:null, income:null, incomeType:null, incomeYear:null, incomeSource:null },

  { id:"amazon_xith", name:"Amazon \"XITH\"", comune:"Soresina", prov:"CR",
    lat:45.2853, lon:9.8556, coordNote:"municipality (exact address not found)",
    scale:"medium", sizeNote:"not specified", year:"not specified", status:"active",
    source:"https://gazzettalogistica.it/centri-logistici-amazon-in-italia/",
    ivsm:99.3, ivsmYear:2011, income:21670, incomeType:"per taxpayer", incomeYear:2016, incomeSource:"https://www.comuni-italiani.it/019/098/statistiche/redditi.html" },

  { id:"amazon_xmp4", name:"Amazon \"XMP4\"", comune:"Casei Gerola", prov:"PV",
    lat:45.0167, lon:8.9333, coordNote:"municipality (address: industrial zone, road to Silvano Pietra)",
    scale:"large", sizeNote:"not specified", year:"not specified", status:"active",
    source:"https://gazzettalogistica.it/centri-logistici-amazon-in-italia/",
    ivsm:null, ivsmYear:null, income:15205, incomeType:"per capita", incomeYear:"~2016", incomeSource:"https://www.comuni-italiani.it/018/033/statistiche/classifiche.html" },

  { id:"amazon_xli3", name:"Amazon \"XLI3\"", comune:"Marzano (PV) — uncertain location", prov:"PV",
    lat:45.1500, lon:9.1500, coordNote:"uncertain location: sources disagree on the exact municipality",
    scale:"medium", sizeNote:"not specified", year:"not specified", status:"active",
    source:"https://gazzettalogistica.it/centri-logistici-amazon-in-italia/",
    ivsm:null, ivsmYear:null, income:null, incomeType:null, incomeYear:null, incomeSource:null },

  { id:"amazon_xci1", name:"Amazon \"XCI1\"", comune:"Bressana Bottarone", prov:"PV",
    lat:45.0672, lon:9.0303, coordNote:"municipality (address: via della Stazione, SP12)",
    scale:"medium", sizeNote:"not specified", year:"not specified", status:"active",
    source:"https://gazzettalogistica.it/centri-logistici-amazon-in-italia/",
    ivsm:null, ivsmYear:null, income:14927, incomeType:"per capita", incomeYear:"~2016", incomeSource:"http://www.comuni-italiani.it/018/023/statistiche/classifiche.html" },

  { id:"amazon_dlo3", name:"Amazon \"DLO3 / VELG\"", comune:"Burago di Molgora", prov:"MB",
    lat:45.5967, lon:9.3681, coordNote:"municipality (address: via Galileo Galilei 3)",
    scale:"medium", sizeNote:"not specified", year:"not specified", status:"active",
    source:"https://gazzettalogistica.it/centri-logistici-amazon-in-italia/",
    ivsm:null, ivsmYear:null, income:19221, incomeType:"per capita", incomeYear:"~2016", incomeSource:"https://www.comuni-italiani.it/108/013/statistiche/classifiche.html" },

  { id:"amazon_dlo1", name:"Amazon \"DLO1\"", comune:"Milan (via Toffetti)", prov:"MI",
    lat:45.4562, lon:9.2432, coordNote:"address: via Vincenzo Toffetti 104",
    scale:"medium", sizeNote:"not specified", year:"21 September 2016", status:"active",
    source:"https://www.varesenews.it/2016/10/amazon-apre-a-origgio-e-porta-20-nuovi-posti-di-lavoro/558998/",
    ivsm:null, ivsmYear:null, income:36408, incomeType:"per taxpayer (city of Milan)", incomeYear:2023, incomeSource:"https://www.infodata.ilsole24ore.com/2025/04/17/ancora-una-volta-linflazione-vanifica-la-crescita-dei-redditi-la-mappa-delle-ricchezza-italia-sempre-piu-diseguale/" },

  { id:"amazon_uit7", name:"Amazon \"UIT7\" — Amazon Fresh", comune:"Peschiera Borromeo", prov:"MI",
    lat:45.4210, lon:9.3050, coordNote:"municipality (south-east Milan, near Linate)",
    scale:"large", sizeNote:"> 10,000 m²", year:"2024", status:"active",
    source:"https://www.ilgiorno.it/milano/cronaca/amazon-peschiera-borromeo-assunzioni-fiycrvz8",
    ivsm:97.3, ivsmYear:2011, income:30818, incomeType:"per taxpayer", incomeYear:2016, incomeSource:"https://www.comuni-italiani.it/015/171/statistiche/redditi.html" },

  { id:"gls_sordio", name:"GLS — international hub", comune:"Sordio", prov:"LO",
    lat:45.3892, lon:9.4278, coordNote:"address: ~500 m from the Vizzolo Predabissi exit, A58",
    scale:"large", sizeNote:"27,000 m² (12,034 m² covered)", year:"28 June 2023", status:"active",
    source:"https://www.euromerci.it/magazzino-del-mese/gls-inaugura-il-nuovo-hub-internazionale-di-sordio-lodi.html",
    ivsm:null, ivsmYear:null, income:15661, incomeType:"per capita", incomeYear:"~2016", incomeSource:"https://www.comuni-italiani.it/098/055/statistiche/classifiche.html" },

  { id:"poste_sda", name:"Poste Italiane / SDA — sorting center", comune:"Peschiera Borromeo", prov:"MI",
    lat:45.4160, lon:9.3140, coordNote:"municipality (exact address not found)",
    scale:"large", sizeNote:"30,000 m²", year:"renovated, as of 2023", status:"active",
    source:"https://tgposte.poste.it/2023/05/10/peschiera-borromeo-700-dipendenti/",
    ivsm:97.3, ivsmYear:2011, income:30818, incomeType:"per taxpayer", incomeYear:2016, incomeSource:"https://www.comuni-italiani.it/015/171/statistiche/redditi.html" },

  { id:"dhl_campus", name:"DHL Express Italy — Innovation Campus", comune:"Peschiera Borromeo", prov:"MI",
    lat:45.4225, lon:9.3160, coordNote:"municipality (Innovation Campus)",
    scale:"medium", sizeNote:"12,800 m² (100,000 m² campus overall)", year:"2018", status:"active",
    source:"https://www.logisticamente.it/DirettamenteAziende/nuova-sede-per-dhl-express-italy/",
    ivsm:97.3, ivsmYear:2011, income:30818, incomeType:"per taxpayer", incomeYear:2016, incomeSource:"https://www.comuni-italiani.it/015/171/statistiche/redditi.html" },

  { id:"tnt_fedex", name:"TNT Express / FedEx — Lombardy branch", comune:"Peschiera Borromeo", prov:"MI",
    lat:45.4150, lon:9.3040, coordNote:"address: via Altiero Spinelli 1",
    scale:"medium", sizeNote:"not specified", year:"not specified", status:"active",
    source:"https://italiarecensioni.com/lombardy/tnt-express-11976",
    ivsm:97.3, ivsmYear:2011, income:30818, incomeType:"per taxpayer", incomeYear:2016, incomeSource:"https://www.comuni-italiani.it/015/171/statistiche/redditi.html" },

  { id:"interporto_mortara", name:"Mortara Interporto (freight terminal)", comune:"Mortara", prov:"PV",
    lat:45.2514, lon:8.7383, coordNote:"address: via 11 Settembre",
    scale:"large", sizeNote:"~700,000 m² total (110,000 terminal + 340,000 logistics area)", year:"not specified", status:"active",
    source:"https://www.poloinmortara.it/interporto/",
    ivsm:98.8, ivsmYear:2011, income:14916, incomeType:"per capita", incomeYear:"~2016", incomeSource:"https://www.comuni-italiani.it/018/102/statistiche/classifiche.html" },

  { id:"milano_smistamento", name:"\"Milano Smistamento\" intermodal terminal (TerAlp / Hupac / Mercitalia)", comune:"Segrate", prov:"MI",
    lat:45.5017, lon:9.3181, coordNote:"municipality (existing rail yard)",
    scale:"large", sizeNote:"240,000 m²", year:"under construction, phase 1 expected 2027", status:"future",
    source:"https://www.hupac.com/IT/Milano-Smistamento-1126bd00",
    ivsm:98.3, ivsmYear:2011, income:null, incomeType:null, incomeYear:null, incomeSource:null },

  { id:"adidas_mantova", name:"Adidas logistics hub (operated by Kuehne+Nagel)", comune:"San Giorgio Bigarello", prov:"MN",
    lat:45.1719, lon:10.8608, coordNote:"municipality",
    scale:"large", sizeNote:"130,000 m²", year:"20 September 2024", status:"active",
    source:"https://www.supplychainitaly.it/2024/09/20/inaugurato-il-maxi-polo-logistico-di-adidas-a-mantova/",
    ivsm:97.0, ivsmYear:"2011 (former municipality of San Giorgio di Mantova, pre-2017 merger)", income:null, incomeType:null, incomeYear:null, incomeSource:null }
];

var DESTINATIONS = [
  {id:"milano", name:"Milan", lat:45.4642, lon:9.1900},
  {id:"bergamo", name:"Bergamo", lat:45.6983, lon:9.6773},
  {id:"brescia", name:"Brescia", lat:45.5416, lon:10.2118},
  {id:"pavia", name:"Pavia", lat:45.1847, lon:9.1582},
  {id:"lodi_city", name:"Lodi", lat:45.3142, lon:9.5034},
  {id:"cremona", name:"Cremona", lat:45.1327, lon:10.0224},
  {id:"monza", name:"Monza", lat:45.5845, lon:9.2744},
  {id:"lecco", name:"Lecco", lat:45.8566, lon:9.3931},
  {id:"como", name:"Como", lat:45.8081, lon:9.0852},
  {id:"varese", name:"Varese", lat:45.8206, lon:8.8250},
  {id:"mantova", name:"Mantua", lat:45.1564, lon:10.7914},
  {id:"sondrio", name:"Sondrio", lat:46.1712, lon:9.8728}
];

/* ARPA Lombardia, 2024 certified data — NO2 annual average (µg/m³)
   source: https://www.arpalombardia.it/agenda/notizie/2025/qualita-dell-aria-dati-certificati-per-il-2024/ */
var AIR_STATIONS_NO2_2024 = [
  { name:"Cinisello Balsamo (Milan agglomeration)", value:41.5, note:"the only exceedance in the region in 2024" },
  { name:"Milan", value:38.5, note:null },
  { name:"Brescia", value:38, note:null },
  { name:"Bergamo", value:32.5, note:null },
  { name:"Cremona", value:23.5, note:null },
  { name:"Lodi", value:22, note:null }
];
var EU_NO2_LIMIT_CURRENT = 40;   // µg/m³ annual average, Legislative Decree 155/2010 (Dir. 2008/50/EC)
var EU_NO2_LIMIT_2030 = 20;      // µg/m³ annual average, from 1/1/2030, EU Directive 2024/2881

/* Full source list — logistics hubs (one row per unique source) */
var HUB_SOURCES = [
  {label:"Amazon LIN8 — Amazon press release", url:"https://amazon-press.it/Top-Navi/Comunicati-Stampa/Pressedetail/amazon/it/2018-11-05-LIN8/"},
  {label:"Amazon centers in Lombardy — Adecco", url:"https://www.adecco-jobs.com/amazon/it-it/centri-amazon/lombardia"},
  {label:"Amazon Origgio — VareseNews", url:"https://www.varesenews.it/2016/10/amazon-apre-a-origgio-e-porta-20-nuovi-posti-di-lavoro/558998/"},
  {label:"Amazon Castegnato — BsNews", url:"https://www.bsnews.it/2020/05/18/amazon-apre-centro-distribuzione-a-castegnato-dara-lavoro-a-100-persone/"},
  {label:"Amazon logistics centers in Italy — Gazzetta Logistica", url:"https://gazzettalogistica.it/centri-logistici-amazon-in-italia/"},
  {label:"Amazon Peschiera Borromeo — Il Giorno", url:"https://www.ilgiorno.it/milano/cronaca/amazon-peschiera-borromeo-assunzioni-fiycrvz8"},
  {label:"GLS Sordio hub — Euromerci", url:"https://www.euromerci.it/magazzino-del-mese/gls-inaugura-il-nuovo-hub-internazionale-di-sordio-lodi.html"},
  {label:"Poste/SDA Peschiera Borromeo — Poste Italiane", url:"https://tgposte.poste.it/2023/05/10/peschiera-borromeo-700-dipendenti/"},
  {label:"DHL Innovation Campus — Logisticamente", url:"https://www.logisticamente.it/DirettamenteAziende/nuova-sede-per-dhl-express-italy/"},
  {label:"TNT Express Lombardy branch", url:"https://italiarecensioni.com/lombardy/tnt-express-11976"},
  {label:"Mortara Interporto — official site", url:"https://www.poloinmortara.it/interporto/"},
  {label:"Milano Smistamento terminal — Hupac", url:"https://www.hupac.com/IT/Milano-Smistamento-1126bd00"},
  {label:"Adidas Mantua logistics hub — Supply Chain Italy", url:"https://www.supplychainitaly.it/2024/09/20/inaugurato-il-maxi-polo-logistico-di-adidas-a-mantova/"},
  {label:"Lombardy warehouse mapping — LIUC Business School", url:"https://www.liucbs.it/news-ed-eventi/magazzini-in-lombardia-in-10-anni-un-aumento-del-50-nella-superficie-edificata-la-mappatura-di-liuc-business-school/"},
  {label:"Logistics hub map — Unioncamere Lombardia (PDF)", url:"https://www.unioncamerelombardia.it/fileadmin/dati__file_report_trimestrali/Infrastrutture/Mappa_dei_nodi_logistici_Report_Finale.pdf"},
  {label:"Montichiari, cargo +42% / Amazon Air — QuiBrescia", url:"https://www.quibrescia.it/aeroporto-di-montichiari/2026/08/05/montichiari-vola-con-il-cargo-42-di-merci-da-settembre-arriva-amazon-air/834866/"},
  {label:"Air quality, 2024 certified data — ARPA Lombardia", url:"https://www.arpalombardia.it/agenda/notizie/2025/qualita-dell-aria-dati-certificati-per-il-2024/"},
  {label:"EU Directive 2024/2881 (new air-quality limits from 2030) — EUR-Lex", url:"https://eur-lex.europa.eu/legal-content/IT/TXT/PDF/?uri=OJ:L_202402881"},
  {label:"Social and Material Vulnerability Index — ISTAT 8MilaCensus", url:"https://ottomilacensus.istat.it/"},
  {label:"Municipal IRPEF income data (Dept. of Finance data, reprocessed) — comuni-italiani.it", url:"https://www.comuni-italiani.it/"},
  {label:"CO₂ emission factor for heavy vehicles — Webfleet", url:"https://www.webfleet.com/it_it/webfleet/blog/come-calcolare-emissioni-co2-camion/"},
  {label:"Road routing — OSRM (Open Source Routing Machine)", url:"http://project-osrm.org/"},
  {label:"Map data — OpenStreetMap (ODbL license)", url:"https://www.openstreetmap.org/copyright"}
];

