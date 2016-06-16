var startCenter = [41.76, -72.67];
var startZoom = 14;

// UConn MAGIC WMS settings - see http://geoserver.lib.uconn.edu:8080/geoserver/web/?wicket:bookmarkablePage=:org.geoserver.web.demo.MapPreviewPage
var magic1934 = new L.tileLayer.wms("http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", {
  layers: 'MAGIC:1934 Connecticut Aerial Photography',
  format: 'image/png',
  version: '1.1.0',
  transparent: true,
  attribution: '<a href="http://magic.library.uconn.edu" target="_blank">1934 MAGIC UConn</a> and <a href="http://cslib.org" target="_blank">CSL</a>'
});

var magic1990 = new L.tileLayer.wms("http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", {
  layers: 'MAGIC:1990 Connecticut Aerial Photography',
  format: 'image/png',
  version: '1.1.0',
  transparent: true,
  attribution: '<a href="http://magic.library.uconn.edu" target="_blank">1990 MAGIC UConn</a>'
});

var magic2004 = new L.tileLayer.wms("http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", {
  layers: 'MAGIC:2004 Connecticut Aerial Photography',
  format: 'image/png',
  version: '1.1.0',
  transparent: true,
  attribution: '<a href="http://magic.library.uconn.edu" target="_blank">2004 MAGIC UConn</a>'
});

// https://esri.github.io/esri-leaflet/api-reference/layers/basemap-layer.html
var esriImagery = L.esri.basemapLayer('Imagery',{
  attribution: '<a href="http://www.esri.com/data/find-data" target="_blank">Esri basemaps</a>'
});
var esriLabels = L.esri.basemapLayer('ImageryLabels');
var esriTransportation = L.esri.basemapLayer('ImageryTransportation');
var esriPresent = [esriImagery, esriLabels, esriTransportation];

var map1 = L.map('map1', {
    layers: magic1934,
    center: startCenter,
    zoom: startZoom,
    zoomControl: false,
    scrollWheelZoom: false
});

var map2 = L.map('map2', {
    layers: esriPresent,
    center: startCenter,
    zoom: startZoom,
    zoomControl: false,
    scrollWheelZoom: false
});

// customize link to view source code; add your own GitHub repository
map1.attributionControl
.setPrefix('View <a href="http://github.com/jackdougherty/leaflet-map-sync" target="_blank">code on GitHub</a>');
map2.attributionControl
.setPrefix('');

// Reposition zoom control other than default topleft
L.control.zoom({position: "topright"}).addTo(map1);
L.control.zoom({position: "topright"}).addTo(map2);

// Display permalink in URL for users to share
// FIX to capture layers from map1 and map2 
map1.addControl(new L.Control.Permalink({text: 'Permalink'}));

L.control.scale().addTo(map2);

new L.Control.GeoSearch({
				provider: new L.GeoSearch.Provider.Google(),
        position: 'topleft' // see also style.CSS
}).addTo(map2);

// sync code adapted from https://www.mapbox.com/mapbox.js/example/v1.0.0/sync-layer-movement/
// when either map finishes moving, trigger an update on the other one
map1.on('moveend', follow).on('zoomend', follow);
map2.on('moveend', follow).on('zoomend', follow);

// when calling sync, do not infinitely loop again and sync other maps
var quiet = false;
function follow(e) {
    if (quiet) return;
    quiet = true;
    if (e.target === map1) sync(map2, e);
    if (e.target === map2) sync(map1, e);
    quiet = false;
}

// sync steals settings from the moved map (e.target) and applies them to other map
function sync(map, e) {
    map.setView(e.target.getCenter(), e.target.getZoom(), {
        animate: false,
        reset: true
    });
}
