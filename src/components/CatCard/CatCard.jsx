import React from "react";
import "./CatCard.css";

function CatCard({ image, name, size = "side", onClick }) {
  const handleClick = () => {
    if (size === "side" && onClick) {
      onClick();
    }
  };

  return (
    <div className={`cat-card ${size}`} onClick={handleClick}>
      <img 
        src={image} 
        alt={`Foto de ${name}`} 
        onError={(e) => {
          e.target.src = 'https://placekitten.com/200/200';
        }}
      />
      <h2>{name}</h2>
      {size === "center" && (
        <button 
          className="adopt-button"
          onClick={(e) => {
            e.stopPropagation();
            alert(`¡${name} está disponible para adopción!`);
          }}
        >
          Adóptame
        </button>
      )}
    </div>
  );
}

export default CatCard;