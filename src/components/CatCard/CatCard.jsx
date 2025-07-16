import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import './CatCard.css';
import Btn from "../Btn/Btn";
import unfavIcon from "../../assets/unfav.png";
import favIcon from "../../assets/fav.png";
import { isFavorite, toggleFavorite } from "../../services/favouritesService";
import { useTranslation } from "react-i18next"; // <-- Se importa el hook

function CatCard({ image, name, size = "side", onClick, catData, onToggleFavorite }) {
  const { t } = useTranslation(); // <-- Se obtiene la función 't'
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(catData?.id));
  }, [catData]);

  if (!catData || !catData.id || !image || !name) {
    console.warn("CatCard: Datos inválidos", catData);
    return null;
  }

  const handleClick = () => {
    if (size === "side" && onClick) {
      onClick();
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();

    if (!catData.id) {
      console.error("No se puede alternar favorito: falta ID del gato");
      return;
    }

    const catToToggle = {
      id: catData.id,
      image: image,
      name: name,
      width: catData.width,
      height: catData.height,
      breed: catData.breed || t('catCard_breed_default') // Opcional: traducir 'Mestizo'
    };

    const newFavState = toggleFavorite(catToToggle);
    setIsFav(newFavState);

    // Se usan las traducciones en las notificaciones
    if (newFavState) {
      toast.success(t('toast_added_to_favorites', { name: name }), { /* ...opciones... */ });
    } else {
      toast.info(t('toast_removed_from_favorites', { name: name }), { /* ...opciones... */ });
    }
    
    if (onToggleFavorite) {
      onToggleFavorite();
    }
  };

  return (
    <div className={`cat-card ${size}`} onClick={handleClick}>
      <div className="image-wrapper">
        <img
          src={image}
          alt={t('catCard_alt', { name: name })} // <-- Texto alt traducido
          onError={(e) => {
            e.target.src = "https://placekitten.com/200/200";
          }}
        />
        <div className="favorite-icon" onClick={handleFavoriteClick}>
          <img
            src={isFav ? favIcon : unfavIcon}
            alt={t(isFav ? 'catCard_alt_is_favorite' : 'catCard_alt_is_not_favorite')} // <-- Alt del icono traducido
            className={`heart-icon ${isFav ? "favorite" : ""}`}
          />
        </div>
      </div>
      <h2>{name}</h2>
      {size === "center" && (
        <Btn
          label={t('catCard_adoptMe')} // <-- Botón traducido
          to="/adopt"
          bgcolor="#91eda7"
          textcolor="#ffffff"
          width="120px"
          height="30px"
          fontsize="18px"
        />
      )}
    </div>
  );
}

export default CatCard;