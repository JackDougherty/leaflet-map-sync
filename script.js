var startCenter = [41.76, -72.67];
var startZoom = 14;

// UConn MAGIC WMS settings - see http://geoserver.lib.uconn.edu:8080/geoserver/web/?wicket:bookmarkablePage=:org.geoserver.web.demo.MapPreviewPage
var aerial1934 = new L.tileLayer.wms("http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", {
  layers: 'MAGIC:1934 Connecticut Aerial Photography',
  format: 'image/png',
  version: '1.1.0',
  transparent: true,
  attribution: '1934 <a href="http://magic.library.uconn.edu">MAGIC UConn</a> and <a href="http://cslib.org">CSL</a>'
});

var esriSatellite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
   attribution: 'Source: Esri'
});

var dark = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

var map1 = L.map('map1', {
    layers: [aerial1934],
    center: startCenter,
    zoom: startZoom,
    zoomControl: false,
    scrollWheelZoom: false
});

var map2 = L.map('map2', {
    layers: [esriSatellite],
    center: startCenter,
    zoom: startZoom,
    zoomControl: false,
    scrollWheelZoom: false
});

// optional : customize link to view source code; add your own GitHub repository
map1.attributionControl
.setPrefix('View <a href="http://github.com/jackdougherty/leaflet-map-sync">code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');
map2.attributionControl
.setPrefix('');

// Reposition zoom control other than default topleft
L.control.zoom({position: "topright"}).addTo(map1);

L.control.scale().addTo(map2);

// // set Esri geocoding provider and place control on map
// // http://esri.github.io/esri-leaflet/api-reference/controls/geosearch.html
// var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();
// var searchControl = L.esri.Geocoding.geosearch({
//   position: 'topleft', // default
//   providers: [arcgisOnline],
//   expanded: true  // default = false
// }).addTo(map1);
// // create an empty layer group to store the results and add it to the map
// var results = L.layerGroup().addTo(map);
// // listen for the results event and add every result to the map
// searchControl.on("results", function(data) {
//   results.clearLayers();
//   for (var i = data.results.length - 1; i >= 0; i--) {
//     results.addLayer(L.marker(data.results[i].latlng));
//   }
// });

// when either map finishes moving, trigger an update on the other one.
map1.on('moveend', follow).on('zoomend', follow);
map2.on('moveend', follow).on('zoomend', follow);

// quiet is a cheap and dirty way of avoiding a problem in which one map
// syncing to another leads to the other map syncing to it, and so on
// ad infinitum. this says that while we are calling sync, do not try to
// loop again and sync other maps
var quiet = false;
function follow(e) {
    if (quiet) return;
    quiet = true;
    if (e.target === map1) sync(map2, e);
    if (e.target === map2) sync(map1, e);
    quiet = false;
}

// sync simply steals the settings from the moved map (e.target)
// and applies them to the other map.
function sync(map, e) {
    map.setView(e.target.getCenter(), e.target.getZoom(), {
        animate: false,
        reset: true
    });
}
