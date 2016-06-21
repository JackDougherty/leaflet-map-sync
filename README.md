# leaflet-map-sync
synchronized side-by-side Leaflet dual maps to display aerial imagery tileLayer.WMS of same location over time

## link
- http://jackdougherty.github.io/leaflet-map-sync/index.html

## compare with
- 2011 MAGIC Google map http://magic.lib.uconn.edu/otl/dualcontrol_aerialchange.html
- Mapbox-gl-compare (v0.20 offers limited WMS support, but no specs for MAGIC WMS layers) http://github.com/jackdougherty/mapbox-gl-compare/

## credits and dependencies
- Thanks @ilyankou for adding basemap switcher control, permalink control, maximum bounds
- Esri Leaflet to display Esri imagery and labels
- L.GeoSearch with Google geocode provider https://github.com/smeijer/L.GeoSearch
- Leaflet-Plugins to generate permalink in URL https://github.com/shramov/leaflet-plugins

## To Do
- BUG: new basemap switcher code does not work in Firefox for Mac (cannot change drop-down menu)
  - please check code and also test in other browsers
- REQUEST: In the permalink results, is is possible to capture the layers for map1 and map2? See layer=OSM in example below:
  - example: http://jackdougherty.github.io/leaflet-map-sync/index-permalink.html#zoom=7&lat=47.93&lon=-3.44&layer=OSM&overlays=F
  - from this working example with one map layer http://jackdougherty.github.io/leaflet-map-sync/index-permalink.html
