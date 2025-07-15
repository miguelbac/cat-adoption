import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Importar toast
import CatCard from '../../components/CatCard/CatCard';
import { getFavorites } from '../../services/favouritesService';
import './FavPage.css';
import bgImageLight from '../../assets/background.png';
import bgImageDark from '../../assets/background-black.png'

function FavPage() {
  const [favorites, setFavorites] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const updateFavorites = () => {
    const favs = getFavorites();
    setFavorites(favs);
    console.log("Favoritos cargados:", favs);
  };

  useEffect(() => {
    updateFavorites();

    const handleStorage = (e) => {
      if (e.key === "catFavorites") updateFavorites();
    };
    window.addEventListener("storage", handleStorage);

    // Detectar tema actual desde el atributo en <html>
    const currentTheme = document.documentElement.getAttribute("data-theme");
    setIsDarkMode(currentTheme === "dark");

    // Observar cambios en el atributo data-theme
    const observer = new MutationObserver(() => {
      const updatedTheme = document.documentElement.getAttribute("data-theme");
      setIsDarkMode(updatedTheme === "dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

     //  Correcto: cleanup dentro del return
  return () => {
    window.removeEventListener("storage", handleStorage);
    observer.disconnect();
  };
}, []);

  const handleFavoriteToggle = () => {
    updateFavorites(); // Se llama cuando se elimina un favorito
  };

  const handleClearAllFavorites = () => {
    localStorage.removeItem("catFavorites");
    updateFavorites();
    toast.success(`No tienes corazón...💔`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
  };

  return (
    <div className="fav-page" style={{ backgroundImage: `url(${isDarkMode ? bgImageDark : bgImageLight})` }}
    >
      <div className="fav-header">
        <h1>Mis gatos favoritos</h1>
        {favorites.length > 0 && (
          <button
            className="clear-favorites-btn"
            onClick={handleClearAllFavorites}
          >
            Eliminar todos
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="no-favorites">
          <h2>No tienes gatos en favoritos 🐾</h2>
          <p>Agrega algunos desde la página principal.</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((cat) => (
            <div className="favorite-card-wrapper" key={cat.id}>
              <CatCard
                image={cat.image}
                name={cat.name}
                size="side"
                catData={cat}
                onToggleFavorite={handleFavoriteToggle}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavPage;