import { Component } from '@angular/core';
import L, { Map } from "leaflet";

import 'leaflet/dist/leaflet.css';

@Component({
  selector: 'MapPanel',
  imports: [],
  template: `<div id="map"></div>`,
  styles: `
:host {
  flex: 1;
}

#map {
  width: 100%;
  height: 100%;
}
  `
})
export default class MapPanel {
  constructor() {}

  map: Map | null = null;

  init() {
    this.map = L.map('map', {
      center: L.latLng(51.98, 5.91),
      zoom: 14,
    });
    
    const key = 'e7OSejk0kPhGt3f7kE1U';
    
    L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,{ //style URL
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 6,
      attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
      crossOrigin: true
    }).addTo(this.map);
  }
}
