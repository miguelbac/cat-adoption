import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';
import { protectoras } from '../../services/mapService';
import bgLight from "../../assets/background.png";
import bgDark from "../../assets/background-black.png";
import { useTheme } from "../../hooks/useTheme";
import { useTranslation } from 'react-i18next';

export default function MapPage() {
  const { theme } = useTheme();
  const { t } = useTranslation(); // Ya teníamos esto, ahora lo usamos más
  const bgImage = theme === "dark" ? bgDark : bgLight;
  const textColor = theme === "dark" ? "#eee" : "#000";
  const linkColor = theme === "dark" ? "#9cf" : "#0066cc";
  const linkHoverColor = theme === "dark" ? "#6af" : "#004999";

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    const map = L.map(mapContainer).setView([43.5456, -5.6615], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    protectoras.forEach((p) => {
      L.marker([p.lat, p.lng])
        .addTo(map)
        // 👇 CAMBIO 1: Usamos la función t() con una clave dinámica
        .bindPopup(`<b>${t(`shelter_name_${p.id}`)}</b>`);
    });

    return () => {
      map.remove();
    };
    // Añadimos 't' a las dependencias del hook porque se usa dentro de él
  }, [t]); 

  return (
    <main className="map-page" style={{ backgroundImage: `url(${bgImage})`, color: textColor, }}>
      <h1 className="map-page__title">{t('mapPage_title')}</h1>

      <div className="map-page__info">
        <div className="map-page__line">
          <span className="map-page__address">{t('mapPage_address')}</span>
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
            style={{ color: linkColor }}
            onMouseEnter={(e) => (e.target.style.color = linkHoverColor)}
            onMouseLeave={(e) => (e.target.style.color = linkColor)}
          >
            {/* 👇 CAMBIO 2: Usamos la misma técnica aquí */}
            {t(`shelter_name_${p.id}`)}
          </a>
        ))}
      </div>
    </main>
  );
}