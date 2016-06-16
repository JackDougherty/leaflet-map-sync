# leaflet-map-sync
synchronized side-by-side Leaflet dual maps to display aerial imagery tileLayer.WMS of same location over time

## link
- http://jackdougherty.github.io/leaflet-map-sync/index.html

## compare with
- 2011 MAGIC Google map http://magic.lib.uconn.edu/otl/dualcontrol_aerialchange.html
- Mapbox-gl-compare (v0.20 offers limited WMS support, but no specs for MAGIC WMS layers) http://github.com/jackdougherty/mapbox-gl-compare/

## credits and dependencies
- Esri Leaflet to display Esri imagery and labels
- L.GeoSearch with Google geocode provider https://github.com/smeijer/L.GeoSearch
- Leaflet-Plugins to generate permalink in URL https://github.com/shramov/leaflet-plugins

## To Do
- FIX drop-down menu code to switch layers (1934, 1990, 2004, present) in both map1 and map2;        
  - see my placeholder code in index.html
  - maybe use some version of this code example, for map1 and map2? https://esri.github.io/esri-leaflet/examples/switching-basemaps.html
- FIX permalink control to capture layers in map1 and map2, in addition to lat/long/zoom in map1
  - see script.js line 63
  - see this working example with one map layer http://jackdougherty.github.io/leaflet-map-sync/index-permalink.html
- ADD maximum bounds for map view since 1934 aerial map covers only Connecticut
  - CT southwest corner:  40.9301  -73.7238
  - CT northeast corner:  42.0248  -71.7792
