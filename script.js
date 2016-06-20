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
    minZoom: 9,
    scrollWheelZoom: false,
    maxBounds: [[40.9301, -73.7238],
                [42.0248, -71.7792]]
});

var map2 = L.map('map2', {
    layers: esriPresent,
    center: startCenter,
    zoom: startZoom,
    minZoom: 9,
    zoomControl: false,
    scrollWheelZoom: false,
    maxBounds: [[40.9301, -73.7238],
                [42.0248, -71.7792]]
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

function changeBasemap(map, basemap) {
  var other_map = (map === 'map1') ? 'map2' : 'map1';
  var map = (map === 'map1') ? map1 : map2;

  // Disable selected layer on the neighbor map
  // (if two maps load the same layer, weird behavior observed)
  $('#' + other_map + ' option').removeAttr('disabled');
  $('#' + other_map + ' option[value="' + basemap + '"]').attr('disabled', 'disabled');

  // Remove the old layer(s)
  [esriImagery,
   esriLabels,
   esriTransportation,
   magic1934,
   magic1990,
   magic2004
 ].forEach(function(v) {
    map.removeLayer(v);
  });

  // Add appropriate new layer
  switch (basemap) {
    case 'esriPresent':
      map.addLayer(esriImagery);
      map.addLayer(esriLabels);
      map.addLayer(esriTransportation);
      break;
    case 'magic1934':
      map.addLayer(magic1934);
      break;
    case 'magic1990':
      map.addLayer(magic1990);
      break;
    case 'magic2004':
      map.addLayer(magic2004);
      break;
    default:
      break;
  }

}

$(document).ready(function() {
  $('#map1basemaps').change(function() {
    changeBasemap('map1', $(this).val());
  });

  $('#map2basemaps').change(function() {
    changeBasemap('map2', $(this).val());
  });

});
