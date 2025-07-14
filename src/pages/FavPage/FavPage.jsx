import React, { useState, useEffect } from 'react';
import CatCard from '../../components/CatCard/CatCard';
import { getFavorites } from '../../services/favouritesService';
import './FavPage.css';

function FavPage() {
  const [favorites, setFavorites] = useState([]);

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
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleFavoriteToggle = () => {
    updateFavorites(); // Se llama cuando se elimina un favorito
  };

  return (
    <div className="fav-page">
      <div className="fav-header">
        <h1>Mis gatos favoritos</h1>
        {favorites.length > 0 && (
          <button
            className="clear-favorites-btn"
            onClick={() => {
              localStorage.removeItem("catFavorites");
              updateFavorites();
            }}
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
