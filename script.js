var startCenter = [41.76, -72.67];
var startZoom = 11;

var light = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});
var dark = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

var map1 = L.map('map1', {
    layers: [light],
    center: startCenter,
    zoom: startZoom,
    zoomControl: false
});

var map2 = L.map('map2', {
    layers: [dark],
    center: startCenter,
    zoom: startZoom,
    zoomControl: false
});

// Reposition zoom control other than default topleft
L.control.zoom({position: "topright"}).addTo(map1);

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
