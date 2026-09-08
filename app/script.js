(function(){
  "use strict";

  var CITIES = [
    {name:"Casablanca",  region:"Casablanca-Settat", lat:33.5731, lon:-7.5898},
    {name:"Rabat",       region:"Rabat-Salé-Kénitra", lat:34.0209, lon:-6.8416},
    {name:"Marrakech",   region:"Marrakech-Safi", lat:31.6295, lon:-7.9811},
    {name:"Fès",         region:"Fès-Meknès", lat:34.0181, lon:-5.0078},
    {name:"Tanger",      region:"Tanger-Tétouan-Al Hoceïma", lat:35.7595, lon:-5.8340},
    {name:"Agadir",      region:"Souss-Massa", lat:30.4278, lon:-9.5981},
    {name:"Oujda",       region:"Oriental", lat:34.6867, lon:-1.9114},
    {name:"Essaouira",   region:"Marrakech-Safi", lat:31.5085, lon:-9.7595},
    {name:"Chefchaouen", region:"Tanger-Tétouan-Al Hoceïma", lat:35.1688, lon:-5.2636},
    {name:"Ouarzazate",  region:"Drâa-Tafilalet", lat:30.9189, lon:-6.8934}
  ];

  var WMO = {
    0:["Clear sky","sun"], 1:["Mainly clear","sun"], 2:["Partly cloudy","cloudSun"], 3:["Overcast","cloud"],
    45:["Fog","fog"], 48:["Rime fog","fog"],
    51:["Light drizzle","drizzle"], 53:["Drizzle","drizzle"], 55:["Dense drizzle","drizzle"],
    56:["Freezing drizzle","drizzle"], 57:["Freezing drizzle","drizzle"],
    61:["Light rain","rain"], 63:["Rain","rain"], 65:["Heavy rain","rain"],
    66:["Freezing rain","rain"], 67:["Freezing rain","rain"],
    71:["Light snow","snow"], 73:["Snow","snow"], 75:["Heavy snow","snow"], 77:["Snow grains","snow"],
    80:["Light showers","rain"], 81:["Showers","rain"], 82:["Violent showers","rain"],
    85:["Snow showers","snow"], 86:["Snow showers","snow"],
    95:["Thunderstorm","storm"], 96:["Thunderstorm, hail","storm"], 99:["Thunderstorm, hail","storm"]
  };

  var ICON = {
    sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.4"/><path d="M12 2.5v2.6M12 18.9v2.6M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12h2.6M18.9 12h2.6M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></svg>',
    cloudSun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="8.5" cy="8" r="3.2"/><path d="M8.5 2.6v1.7M4 8h1.6M13 8h-1.6M5.2 4.7l1.2 1.2M11.4 4.7l-1.2 1.2"/><path d="M8.4 17.5h9.1a3.5 3.5 0 0 0 .4-6.98A5 5 0 0 0 8.9 13"/></svg>',
    cloud:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6.5 18.5h11.6a3.9 3.9 0 0 0 .4-7.78A6 6 0 0 0 7 13.2a4 4 0 0 0-.5 5.3z"/></svg>',
    fog:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6.5 12.5h11.6a3.9 3.9 0 0 0 .4-7.78A6 6 0 0 0 7 7.2"/><path d="M3.5 17h17M3.5 20.5h17"/></svg>',
    drizzle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6.5 12.5h11.1a3.7 3.7 0 0 0 .4-7.4A5.8 5.8 0 0 0 7 7.1"/><path d="M8 17.5v2M12 17.5v2M16 17.5v2"/></svg>',
    rain:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6.5 11.8h11.1a3.7 3.7 0 0 0 .4-7.4A5.8 5.8 0 0 0 7 6.4"/><path d="M7.5 17v3M12 17v3M16.5 17v3"/></svg>',
    snow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6.5 11.8h11.1a3.7 3.7 0 0 0 .4-7.4A5.8 5.8 0 0 0 7 6.4"/><path d="M8 17v.01M12 18v.01M16 17v.01M8 20v.01M16 20v.01M12 21v.01"/></svg>',
    storm:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6.5 11.3h10.6a3.6 3.6 0 0 0 .4-7.18A5.6 5.6 0 0 0 7 5.9"/><path d="M12.5 15l-2.8 4.6h2.6L10.7 22"/></svg>',
    wind:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 8h9.5a2.5 2.5 0 1 0-2.3-3.4"/><path d="M3 12.5h13.5a2.5 2.5 0 1 1-2.3 3.5"/><path d="M3 17h7.5a2 2 0 1 1-1.8 2.8"/></svg>',
    gust:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2.5 7h11a2.3 2.3 0 1 0-2.1-3.1"/><path d="M2.5 12h15a2.3 2.3 0 1 1-2.1 3.2"/><path d="M2.5 17h9a2.3 2.3 0 1 1-2 3.1"/></svg>',
    drop:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5s6.5 7.2 6.5 12a6.5 6.5 0 1 1-13 0c0-4.8 6.5-12 6.5-12z"/></svg>',
    gauge:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 15.5a8 8 0 1 1 16 0"/><path d="M12 15.5l3.4-4.4"/><path d="M4 15.5h.01M20 15.5h.01M12 5.5v.01"/></svg>',
    thermo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 14.8V5a2 2 0 1 0-4 0v9.8a4 4 0 1 0 4 0z"/></svg>'
  };
  function iconOf(code){ var e = WMO[code] || ["—","cloud"]; return e; }

  /* ---------- state ---------- */
  var state = { 
    cities: CITIES.map(function(c){ return {def:c, data:null, error:false}; }), 
    selected:0, 
    activeTab:"wind",
    searchedCity: null // Holds temporarily searched city data before saving
  };

  /* ---------- fetch ---------- */
  function apiUrl(c){
    var params = [
      "latitude="+c.lat, "longitude="+c.lon,
      "current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_gusts_10m,is_day",
      "hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_gusts_10m,pressure_msl,cloud_cover",
      "daily=temperature_2m_max,temperature_2m_min",
      "past_days=5","forecast_days=1","timezone=auto"
    ];
    return "https://api.open-meteo.com/v1/forecast?"+params.join("&");
  }

  function fetchCity(entry){
    return fetch(apiUrl(entry.def)).then(function(r){
      if(!r.ok) throw new Error("HTTP "+r.status);
      return r.json();
    }).then(function(json){
      entry.data = json; entry.error = false; return json;
    }).catch(function(err){
      entry.error = true; entry.data = null; console.error("Fetch failed for", entry.def.name, err);
    });
  }

  function loadAll(){
    setSpinning(true);
    var jobs = state.cities.map(fetchCity);
    return Promise.allSettled ? Promise.allSettled(jobs) : Promise.all(jobs.map(function(p){return p.catch(function(){});}));
  }

  function setSpinning(on){
    var btn = document.getElementById("refreshBtn");
    if(on) btn.classList.add("spinning"); else btn.classList.remove("spinning");
  }

  function fmt(n, d){ if(n===null||n===undefined||isNaN(n)) return "—"; return Number(n).toFixed(d===undefined?0:d); }
  function nowIndex(hourlyTimes, currentTimeIso){
    var idx = hourlyTimes.findIndex(function(t){ return t >= currentTimeIso; });
    return idx < 0 ? Math.max(0, hourlyTimes.length-24) : idx;
  }
  function weekday(dateStr){
    var d = new Date(dateStr+"T12:00:00");
    return d.toLocaleDateString("en-GB", {weekday:"short"});
  }
  function dayLabel(dateStr){
    var d = new Date(dateStr+"T12:00:00");
    return d.toLocaleDateString("en-GB", {day:"2-digit", month:"short"});
  }
  function hourLabel(iso){
    var d = new Date(iso);
    return d.toLocaleTimeString("en-GB", {hour:"2-digit", minute:"2-digit"});
  }

  /* ---------- sidebar ---------- */
  function renderSidebar(){
    var ul = document.getElementById("cityList");
    ul.innerHTML = "";
    state.cities.forEach(function(entry, i){
      var li = document.createElement("li");
      li.className = "city-item-wrapper";

      var btn = document.createElement("button");
      btn.className = "nav-city" + ((state.selected === i && !state.searchedCity) ? " active" : "");
      var temp = "···";
      var tempClass = "pending";
      if(entry.data && entry.data.current){ temp = fmt(entry.data.current.temperature_2m,0)+"°"; tempClass=""; }
      else if(entry.error){ temp = "—"; tempClass=""; }
      
      btn.innerHTML =
        '<span class="nc-left"><span class="nc-name">'+entry.def.name+'</span><span class="nc-region">'+(entry.def.region || '')+'</span></span>'+
        '<span class="nc-temp '+tempClass+'">'+temp+'</span>';
      
      btn.addEventListener("click", function(){ 
        state.searchedCity = null; // Exit searched mode
        state.selected = i; 
        state.activeTab="wind"; 
        renderAll(); 
      });

      // Delete button for sidebar items
      var delBtn = document.createElement("button");
      delBtn.className = "delete-city-btn";
      delBtn.innerHTML = '&times;';
      delBtn.title = "Delete from sidebar";
      delBtn.addEventListener("click", function(e){
        e.stopPropagation();
        if(state.cities.length <= 1){
          alert("You must keep at least one city in the sidebar.");
          return;
        }
        state.cities.splice(i, 1);
        if(state.selected >= state.cities.length){
          state.selected = state.cities.length - 1;
        }
        renderAll();
      });

      li.appendChild(btn);
      li.appendChild(delBtn);
      ul.appendChild(li);
    });
  }

  /* ---------- active current data resolver ---------- */
  function getActiveEntry(){
    if(state.searchedCity){
      return state.searchedCity;
    }
    return state.cities[state.selected];
  }

  /* ---------- hero ---------- */
  function renderHero(){
    var entry = getActiveEntry();
    var el = document.getElementById("heroSection");
    if(!entry.data){
      el.innerHTML = '<div class="hero"><div class="state-msg">'+(entry.error ? "Couldn't load data for "+entry.def.name+"." : "Loading "+entry.def.name+"…")+'</div></div>';
      return;
    }
    var cur = entry.data.current;
    var cond = iconOf(cur.weather_code);
    var t = cur.temperature_2m, feels = cur.apparent_temperature;
    var scaleMin=-5, scaleMax=45;
    var pct = Math.min(100, Math.max(0, (t-scaleMin)/(scaleMax-scaleMin)*100));
    var localTime = hourLabel(cur.time);

    // Add an "Add to Sidebar" button if viewing a searched city not yet in the list
    var addBtnHtml = "";
    if(state.searchedCity){
      addBtnHtml = '<button id="addToSidebarBtn" class="add-sidebar-btn">+ Add to Sidebar</button>';
    }

    el.innerHTML =
    '<div class="hero">'+
      '<div class="hero-left">'+
        '<div class="hero-city"><h1>'+entry.def.name+'</h1><span class="region">'+(entry.def.region ? entry.def.region+' · ' : '')+'local time '+localTime+'</span>'+addBtnHtml+'</div>'+
        '<div class="hero-temp-row">'+
          '<span class="hero-temp mono">'+fmt(t,1)+'<sup>°C</sup></span>'+
          '<span class="hero-cond">'+ICON[cond[1]]+'<span class="hero-cond-text">'+cond[0]+'</span></span>'+
        '</div>'+
        '<div class="hero-sub-stats">'+
          '<span>Feels like <b>'+fmt(feels,1)+'°</b></span>'+
          '<span>Humidity <b>'+fmt(cur.relative_humidity_2m,0)+'%</b></span>'+
          '<span>Wind <b>'+fmt(cur.wind_speed_10m,0)+' km/h</b></span>'+
          '<span>Cloud cover <b>'+fmt(cur.cloud_cover,0)+'%</b></span>'+
        '</div>'+
      '</div>'+
      '<div class="thermo">'+
        '<div class="thermo-scale"><div class="thermo-marker" style="left:calc('+pct+'% - 1px);"></div></div>'+
        '<div class="thermo-labels"><span>'+scaleMin+'°</span><span>'+scaleMax+'°</span></div>'+
        '<div class="thermo-caption">position on regional range</div>'+
      '</div>'+
    '</div>';

    if(state.searchedCity){
      document.getElementById("addToSidebarBtn").addEventListener("click", function(){
        state.cities.unshift(state.searchedCity);
        state.searchedCity = null;
        state.selected = 0;
        renderAll();
      });
    }
  }

  /* ---------- KPI cards ---------- */
  function sparkPath(values, w, h, pad){
    pad = pad===undefined?2:pad;
    var min = Math.min.apply(null, values), max = Math.max.apply(null, values);
    if(min===max){ min -= 1; max += 1; }
    var n = values.length;
    var pts = values.map(function(v,i){
      var x = (i/(n-1))*(w-pad*2)+pad;
      var y = h-pad - ((v-min)/(max-min))*(h-pad*2);
      return x.toFixed(1)+","+y.toFixed(1);
    });
    return pts.join(" ");
  }
  function sparkSvg(values, color){
    var w=120,h=26;
    var pts = sparkPath(values,w,h);
    var firstPt = pts.split(" ")[0].split(",");
    var lastPt = pts.split(" ")[pts.split(" ").length-1].split(",");
    var area = "M"+firstPt[0]+","+h+" L"+pts.replace(/ /g," L")+" L"+lastPt[0]+","+h+" Z";
    return '<svg viewBox="0 0 '+w+' '+h+'" preserveAspectRatio="none">'+
      '<path d="'+area+'" fill="'+color+'" opacity="0.14"></path>'+
      '<polyline points="'+pts+'" fill="none" stroke="'+color+'" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></polyline>'+
    '</svg>';
  }

  function trailingSeries(entry, key){
    var h = entry.data.hourly;
    var idx = nowIndex(h.time, entry.data.current.time);
    var start = Math.max(0, idx-23);
    return h[key].slice(start, idx+1).filter(function(v){ return v!==null && v!==undefined; });
  }

  function renderKPI(){
    var entry = getActiveEntry();
    var grid = document.getElementById("kpiGrid");
    var sub = document.getElementById("kpiSub");
    if(!entry.data){ grid.innerHTML=""; sub.textContent=""; return; }
    var cur = entry.data.current;
    sub.textContent = "As of "+hourLabel(cur.time)+" local time";

    var cards = [
      {label:"Feels like", value:fmt(cur.apparent_temperature,1), unit:"°C", icon:"thermo", cls:"ic-feels"},
      {label:"Humidity", value:fmt(cur.relative_humidity_2m,0), unit:"%", icon:"drop", cls:"ic-hum", spark:trailingSeries(entry,"relative_humidity_2m"), color:"#28857A"},
      {label:"Pressure (MSL)", value:fmt(cur.pressure_msl,0), unit:"hPa", icon:"gauge", cls:"ic-press", spark:trailingSeries(entry,"pressure_msl"), color:"#B98426"},
      {label:"Wind speed", value:fmt(cur.wind_speed_10m,0), unit:"km/h", icon:"wind", cls:"ic-wind", spark:trailingSeries(entry,"wind_speed_10m"), color:"#2E4C9C"},
      {label:"Wind gusts", value:fmt(cur.wind_gusts_10m,0), unit:"km/h", icon:"gust", cls:"ic-gust"},
      {label:"Cloud cover", value:fmt(cur.cloud_cover,0), unit:"%", icon:"cloud", cls:"ic-cloud", spark:trailingSeries(entry,"cloud_cover"), color:"#6b6656"},
      {label:"Precipitation", value:fmt(cur.precipitation,1), unit:"mm", icon:"drizzle", cls:"ic-precip"}
    ];

    grid.innerHTML = cards.map(function(c){
      var spark = (c.spark && c.spark.length>1) ? '<div class="kpi-spark">'+sparkSvg(c.spark, c.color)+'</div>' : '';
      return '<div class="kpi-card">'+
        '<div class="kpi-top"><span class="kpi-label">'+c.label+'</span><span class="kpi-icon '+c.cls+'">'+ICON[c.icon]+'</span></div>'+
        '<div class="kpi-value">'+c.value+'<span>'+c.unit+'</span></div>'+
        spark+
      '</div>';
    }).join("");
  }

  /* ---------- daily range ---------- */
  function renderDaily(){
    var entry = getActiveEntry();
    var card = document.getElementById("dailyCard");
    if(!entry.data){ card.innerHTML = '<div class="state-msg">No data yet.</div>'; return; }
    var d = entry.data.daily;
    var n = Math.min(5, d.time.length);
    var days = [];
    for(var i=0;i<n;i++){ days.push({date:d.time[i], max:d.temperature_2m_max[i], min:d.temperature_2m_min[i]}); }

    var globalMin = Math.min.apply(null, days.map(function(x){return x.min;}));
    var globalMax = Math.max.apply(null, days.map(function(x){return x.max;}));
    var range = (globalMax-globalMin) || 1;

    card.innerHTML = days.map(function(x){
      var left = ((x.min-globalMin)/range)*100;
      var width = ((x.max-x.min)/range)*100;
      return '<div class="daily-row">'+
        '<div class="daily-day"><span class="dow">'+weekday(x.date)+'</span><span class="ddate">'+dayLabel(x.date)+'</span></div>'+
        '<div class="daily-track"><div class="daily-bar" style="left:'+left.toFixed(1)+'%; width:'+Math.max(width,3).toFixed(1)+'%;"></div></div>'+
        '<div class="daily-vals"><span class="dmin">'+fmt(x.min,0)+'°</span><span class="dmax">'+fmt(x.max,0)+'°</span></div>'+
      '</div>';
    }).join("");
  }

  /* ---------- hourly chart ---------- */
  var TABS = [
    {id:"temp",  label:"Temperature", series:[{key:"temperature_2m", color:"#AD4E2C", label:"Temperature", unit:"°C", area:true}]},
    {id:"wind",  label:"Wind", series:[{key:"wind_speed_10m", color:"#2E4C9C", label:"Wind speed", unit:"km/h"},{key:"wind_gusts_10m", color:"#AD4E2C", label:"Wind gusts", unit:"km/h"}]},
    {id:"hum",   label:"Humidity", series:[{key:"relative_humidity_2m", color:"#28857A", label:"Relative humidity", unit:"%", area:true}]},
    {id:"press", label:"Pressure", series:[{key:"pressure_msl", color:"#B98426", label:"Pressure (MSL)", unit:"hPa"}]},
    {id:"cloud", label:"Cloud cover", series:[{key:"cloud_cover", color:"#6b6656", label:"Cloud cover", unit:"%", area:true}]}
  ];

  function renderTabs(){
    var bar = document.getElementById("tabBar");
    bar.innerHTML = TABS.map(function(t){
      return '<button class="tab-btn'+(t.id===state.activeTab?" active":"")+'" data-tab="'+t.id+'">'+t.label+'</button>';
    }).join("");
    Array.prototype.forEach.call(bar.querySelectorAll(".tab-btn"), function(btn){
      btn.addEventListener("click", function(){ state.activeTab = btn.getAttribute("data-tab"); renderHourlyChart(); renderTabs(); });
    });
  }

  function buildLinePath(values, w, h, padX, padTop, padBottom, min, max){
    var n = values.length;
    var pts = [];
    for(var i=0;i<n;i++){
      var v = values[i];
      var x = padX + (i/(n-1))*(w-padX*2);
      var y = h-padBottom - ((v-min)/((max-min)||1))*(h-padTop-padBottom);
      pts.push([x,y]);
    }
    return pts;
  }
  function ptsToPolyline(pts){ return pts.map(function(p){return p[0].toFixed(1)+","+p[1].toFixed(1);}).join(" "); }

  function renderHourlyChart(){
    var entry = getActiveEntry();
    var wrap = document.getElementById("chartWrap");
    var legend = document.getElementById("chartLegend");
    var sub = document.getElementById("hourlySub");
    if(!entry.data){ wrap.innerHTML='<div class="state-msg">No data yet.</div>'; legend.innerHTML=""; sub.textContent=""; return; }

    var h = entry.data.hourly;
    var idx = nowIndex(h.time, entry.data.current.time);
    var slice = Math.min(24, h.time.length-idx);
    var times = h.time.slice(idx, idx+slice);
    sub.textContent = times.length ? (hourLabel(times[0])+" – "+hourLabel(times[times.length-1])+" local time") : "";

    var tab = TABS.filter(function(t){return t.id===state.activeTab;})[0];
    var W=760,H=210, padX=8, padTop=14, padBottom=26;

    var allVals = [];
    tab.series.forEach(function(s){
      var arr = h[s.key].slice(idx, idx+slice);
      s._vals = arr;
      allVals = allVals.concat(arr.filter(function(v){return v!==null && v!==undefined;}));
    });
    var min = Math.min.apply(null, allVals), max = Math.max.apply(null, allVals);
    if(min===max){ min-=1; max+=1; }
    var pad = (max-min)*0.12;
    min -= pad; max += pad;

    var gridLines = "";
    var gridCount = 4;
    for(var g=0; g<=gridCount; g++){
      var gy = padTop + (g/gridCount)*(H-padTop-padBottom);
      var gv = max - (g/gridCount)*(max-min);
      gridLines += '<line x1="'+padX+'" y1="'+gy.toFixed(1)+'" x2="'+(W-padX)+'" y2="'+gy.toFixed(1)+'" stroke="rgba(22,26,34,0.08)" stroke-width="1"/>';
      gridLines += '<text x="'+(W-padX)+'" y="'+(gy-4).toFixed(1)+'" text-anchor="end" font-size="10.5" font-family="JetBrains Mono, monospace" fill="rgba(22,26,34,0.42)">'+fmt(gv,0)+'</text>';
    }

    var xLabels = "";
    var labelEvery = Math.ceil(slice/8);
    for(var i=0;i<slice;i+=labelEvery){
      var lx = padX + (i/(slice-1))*(W-padX*2);
      xLabels += '<text x="'+lx.toFixed(1)+'" y="'+(H-6)+'" text-anchor="middle" font-size="10.5" font-family="JetBrains Mono, monospace" fill="rgba(22,26,34,0.42)">'+hourLabel(times[i])+'</text>';
    }

    var seriesSvg = tab.series.map(function(s){
      var pts = buildLinePath(s._vals, W, H, padX, padTop, padBottom, min, max);
      var poly = ptsToPolyline(pts);
      var out = "";
      if(s.area){
        var areaPath = "M"+pts[0][0].toFixed(1)+","+(H-padBottom)+" L"+poly.replace(/ /g," L")+" L"+pts[pts.length-1][0].toFixed(1)+","+(H-padBottom)+" Z";
        out += '<path d="'+areaPath+'" fill="'+s.color+'" opacity="0.13"></path>';
      }
      out += '<polyline points="'+poly+'" fill="none" stroke="'+s.color+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></polyline>';
      return out;
    }).join("");

    wrap.innerHTML = '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+tab.label+' chart">'+gridLines+xLabels+seriesSvg+'</svg>';

    legend.innerHTML = tab.series.map(function(s){
      return '<span class="lg-item"><span class="lg-swatch" style="background:'+s.color+';"></span>'+s.label+' ('+s.unit+')</span>';
    }).join("");
  }

  /* ---------- clock ---------- */
  function tickClock(){
    var entry = getActiveEntry();
    var tz = (entry.data && entry.data.timezone) ? entry.data.timezone : "Africa/Casablanca";
    var el = document.getElementById("clock");
    try{
      el.textContent = new Date().toLocaleTimeString("en-GB", {timeZone:tz, hour:"2-digit", minute:"2-digit", second:"2-digit"});
    }catch(e){ el.textContent = new Date().toLocaleTimeString("en-GB"); }
  }

  /* ---------- global search feature using Open-Meteo Geocoding API ---------- */
  function setupSearch(){
    var input = document.getElementById("citySearchInput");
    if(!input) return;
    input.addEventListener("keydown", function(e){
      if(e.key === "Enter"){
        var query = input.value.trim();
        if(!query) return;
        input.disabled = true;
        input.placeholder = "Searching…";

        fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(query) + "&count=1")
          .then(function(r){ return r.json(); })
          .then(function(data){
            input.disabled = false;
            input.value = "";
            input.placeholder = "Search any city…";

            if(!data.results || data.results.length === 0){
              alert("City not found. Try another spelling.");
              return;
            }

            var item = data.results[0];
            var newCity = {
              name: item.name,
              region: item.country || item.admin1 || "",
              lat: item.latitude,
              lon: item.longitude
            };

            var newEntry = {def: newCity, data: null, error: false};
            state.searchedCity = newEntry; // Temporarily view without saving to sidebar yet

            fetchCity(newEntry).then(function(){
              renderAll();
            });
          })
          .catch(function(err){
            input.disabled = false;
            input.value = "";
            input.placeholder = "Search any city…";
            console.error("Geocoding failed", err);
            alert("Error looking up city.");
          });
      }
    });
  }

  /* ---------- orchestration ---------- */
  function renderAll(){
    renderSidebar();
    renderHero();
    renderKPI();
    renderDaily();
    renderTabs();
    renderHourlyChart();
    tickClock();
  }

  function refresh(){
    setSpinning(true);
    loadAll().then(function(){
      setSpinning(false);
      document.getElementById("updatedAt").textContent = "Updated "+new Date().toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});
      renderAll();
    });
  }

  document.getElementById("refreshBtn").addEventListener("click", refresh);
  setInterval(tickClock, 1000);

  setupSearch();
  refresh();
})();