# leaflet-map-sync
synchronized side-by-side Leaflet dual maps to display aerial imagery tileLayer.WMS of same location over time

## link
- http://jackdougherty.github.io/leaflet-map-sync/index.html

## compare with
- 2011 MAGIC Google map http://magic.lib.uconn.edu/otl/dualcontrol_aerialchange.html
- Mapbox-gl-compare (currently does not support MAGIC WMS layers) http://github.com/jackdougherty/mapbox-gl-compare/

## To Do

- fix drop-down menu code to switch layers (1934, 1990, 2004, present) in map1 and map2; probably use some variation on this code example? https://esri.github.io/esri-leaflet/examples/switching-basemaps.html
- add permalink feature to capture lat/long/zoom in map1, and layers in map1 and map2
https://github.com/shramov/leaflet-plugins/blob/master/examples/permalink.html
- decide if esri geocoder control is adequate, or consider mapbox (with user limits)
 https://esri.github.io/esri-leaflet/examples/geocoding-control.html
