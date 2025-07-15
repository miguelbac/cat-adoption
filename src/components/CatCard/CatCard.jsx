import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./CatCard.css";
import Btn from "../Btn/Btn";
import unfavIcon from "../../assets/unfav.png";
import favIcon from "../../assets/fav.png";
import { isFavorite, toggleFavorite } from "../../services/favouritesService";

function CatCard({ image, name, size = "side", onClick, catData, onToggleFavorite }) {
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
      breed: catData.breed || "Mestizo"
    };

    const newFavState = toggleFavorite(catToToggle);
    setIsFav(newFavState);

    // Mostrar notificación según la acción
    if (newFavState) {
      // Gato agregado a favoritos
      toast.success(`¡${name} ha sido añadido a favoritos! 🐾`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // Gato eliminado de favoritos
      toast.info(`${name} ha sido eliminado de favoritos ☹`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    // 💡 Notificar al componente padre si hay un callback
    if (onToggleFavorite) {
      onToggleFavorite();
    }
  };

  return (
    <div className={`cat-card ${size}`} onClick={handleClick}>
      <div className="image-wrapper">
        <img
          src={image}
          alt={`Foto de ${name}`}
          onError={(e) => {
            e.target.src = "https://placekitten.com/200/200";
          }}
        />
        <div className="favorite-icon" onClick={handleFavoriteClick}>
          <img
            src={isFav ? favIcon : unfavIcon}
            alt={isFav ? "Favorito" : "No favorito"}
            className={`heart-icon ${isFav ? "favorite" : ""}`}
          />
        </div>
      </div>
      <h2>{name}</h2>
      {size === "center" && (
        <Btn
          label="Adóptame"
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