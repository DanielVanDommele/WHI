import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapPanel () {

    return (
        <div className="mapPanel">
            <div id="map">
                This frontend development is currently discontinued. Please checkout the Angular or Vue Frontend.
            {/* <MapContainer center={[51.98, 5.91]} zoom={14} scrollWheelZoom={true}>
                <TileLayer
                minZoom={6}
                attribution='\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e'
                url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}"
                />
            </MapContainer> */}
            </div>
        </div>
    );
}