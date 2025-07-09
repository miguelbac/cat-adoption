import React from "react";
import "./CatCard.css";

function CatCard({ image, name }) {
  return (
    <div className="cat-card">
      <img src={image} alt={`Foto de ${name}`} />
      <h2>{name}</h2>
      <button>¡Adóptame!</button>
    </div>
  );
}

export default CatCard;
