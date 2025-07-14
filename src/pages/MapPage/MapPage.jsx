import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';
import { protectoras } from '../../services/mapService';
import bgLight from "../../assets/background.png";
import bgDark from "../../assets/background-black.png";

import { useTheme } from "../../hooks/useTheme";

export default function MapPage() {
  const { theme } = useTheme();
  const bgImage = theme === "dark" ? bgDark : bgLight;
  
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
     <main className="map-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <h1 className="map-page__title">¿Dónde Estamos?</h1>

      <div className="map-page__info">
        <div className="map-page__line">
          <span className="map-page__address">Avenida Gatuna Nº13</span>
          <span className="map-page__phone">+34645967492</span>
        </div>
        <div className="map-page__email">adoptaunmichi@miaumail.com</div>
      </div>

      <div id="map" className="map-page__map"></div>

      <div className="map-page__protectoras-list">
        {protectoras.map((p) => (
          <a
            key={p.id}
            href={`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="map-page__link"
          >
            {p.nombre}
          </a>
        ))}
      </div>
    </main>
  );
}