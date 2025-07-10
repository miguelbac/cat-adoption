import React from "react";
import "./CatCard.css";

function CatCard({ image, name, size = "side" }) {
  return (
    <div className={`cat-card ${size}`}>
      <img src={image} alt={`Foto de ${name}`} />
      <h2>{name}</h2>
      {size === "center" && <button>Adóptame</button>}
    </div>
  );
}

export default CatCard;
