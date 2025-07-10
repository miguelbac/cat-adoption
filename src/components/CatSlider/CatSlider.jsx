import React, { useEffect, useState } from "react";
import { fetchCats } from "../../services/catService";
import CatCard from "../CatCard/CatCard";
import "./CatSlider.css";

export default function CatSlider() {
  const [cats, setCats] = useState([]);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    async function loadCats() {
      const catList = await fetchCats(10);
      setCats(catList);
    }
    loadCats();
  }, []);

  const next = () => {
    setCenterIndex((prev) => (prev + 1) % cats.length);
  };

  const prev = () => {
    setCenterIndex((prev) => (prev - 1 + cats.length) % cats.length);
  };

  const getCard = (offset) => {
    if (cats.length === 0) return null;
    const index = (centerIndex + offset + cats.length) % cats.length;
    const size = offset === 0 ? "center" : "side";
    return <CatCard key={cats[index].id} {...cats[index]} size={size} />;
  };

  return (
    <div className="slider-wrapper">
      <h1>Gatos en adopción</h1>
      <div className="cat-slider">
        <button className="arrow left" onClick={prev}>‹</button>
        <div className="card-track">
          {getCard(-1)}
          {getCard(0)}
          {getCard(1)}
        </div>
        <button className="arrow right" onClick={next}>›</button>
      </div>
    </div>
  );
}