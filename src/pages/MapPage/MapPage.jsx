import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';
import { protectoras } from '../../services/mapService';

export default function MapPage() {
  useEffect(() => {
    // Esperar a que el elemento con id 'map' exista en el DOM
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Crear mapa centrado en Gijón
    const map = L.map(mapContainer).setView([43.5456, -5.6615], 13);

    // Cargar capa base OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Añadir marcadores de protectoras
    protectoras.forEach((p) => {
      L.marker([p.lat, p.lng])
        .addTo(map)
        .bindPopup(`<b>${p.nombre}</b>`);
    });

    // Limpiar al desmontar
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="map-container">
      <h1 className="title">¿Dónde Estamos?</h1>

      {/* Este div se usa como contenedor del mapa */}
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