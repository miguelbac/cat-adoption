import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';
import { protectoras } from '../../services/mapService';

export default function MapPage() {
  useEffect(() => {
    // Crear mapa centrado en Gijón
    const map = L.map('map').setView([43.5456, -5.6615], 13);

    // Cargar mapa base (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Añadir marcadores desde MapService.js
    protectoras.forEach((p) => {
      L.marker([p.lat, p.lng])
        .addTo(map)
        .bindPopup(`<b>${p.nombre}</b>`);
    });

    // Cleanup para evitar duplicados
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="map-container">
      <h1 className="title">¿Dónde Estamos?</h1>
      <div id="map"></div>

      <div className="protectoras-list">
        {protectoras.map((p) => (
          <a
            key={p.id}
            href={`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="protectora-link"
          >
            {p.nombre}
          </a>
        ))}
      </div>
    </div>
  );
}