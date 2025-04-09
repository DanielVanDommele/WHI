<template>
  <div class="map-panel">
    <div id="map"></div>
  </div>
</template>

<style>
.map-panel {
  flex: 1;
  font-size: 16px;
  font-family: Tahoma;
}

#map {
  width: 100%;
  height: 100%;
}
</style>

<script lang="ts" setup>
import L, { Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted } from "vue";

let map: Map | null = null;

function init() {
  console.log("init fn reached");
  map = L.map("map", {
    center: L.latLng(51.98, 5.91),
    zoom: 14,
  });

  const key = "e7OSejk0kPhGt3f7kE1U";
  const attribution =
    '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e';
  const tileUrl = `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`;
  L.tileLayer(tileUrl, {
    //style URL
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 6,
    attribution: attribution,
    crossOrigin: true,
  }).addTo(map);
  console.log(key, attribution, tileUrl);
}

onMounted(() => init());
</script>
