import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import CatCard from '../../components/CatCard/CatCard';
import { getFavorites } from '../../services/favouritesService';
import './FavPage.css';
import bgImageLight from '../../assets/background.png';
import bgImageDark from '../../assets/background-black.png';
import { useTranslation } from 'react-i18next';

function FavPage() {
  const { t } = useTranslation();
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

    const currentTheme = document.documentElement.getAttribute("data-theme");
    setIsDarkMode(currentTheme === "dark");

    const observer = new MutationObserver(() => {
      const updatedTheme = document.documentElement.getAttribute("data-theme");
      setIsDarkMode(updatedTheme === "dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      window.removeEventListener("storage", handleStorage);
      observer.disconnect();
    };
  }, []);

  const handleFavoriteToggle = () => {
    updateFavorites();
  };

  const handleClearAllFavorites = () => {
    localStorage.removeItem("catFavorites");
    updateFavorites();
    toast.success(t('toast_cleared_favorites'), {
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
    <div className="fav-page" style={{ backgroundImage: `url(${isDarkMode ? bgImageDark : bgImageLight})` }}>
      <div className="fav-header">
        <h1>{t('favPage_title')}</h1>
        {favorites.length > 0 && (
          <button
            className="clear-favorites-btn"
            onClick={handleClearAllFavorites}
          >
            {t('favPage_clear_all')}
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="no-favorites">
          <h2>{t('favPage_no_favorites_title')}</h2>
          <p>{t('favPage_no_favorites_subtitle')}</p>
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