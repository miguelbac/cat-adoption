import React, { useEffect, useState } from "react";
import { fetchCats } from "../../services/catService";
import CatCard from "../CatCard/CatCard";
import "./CatSlider.css";

export default function CatSlider() {
  const [cats, setCats] = useState([]);
  const [centerIndex, setCenterIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    async function loadCats() {
      try {
        setIsLoading(true);
        const catList = await fetchCats(15); // Cargar más gatos para mejor variedad
        setCats(catList);
        console.log('Gatos cargados:', catList); // Debug
      } catch (error) {
        console.error('Error cargando gatos:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCats();
  }, []);

  const next = () => {
    if (isAnimating || cats.length === 0) return;
    
    setIsAnimating(true);
    setCenterIndex((prev) => (prev + 1) % cats.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const prev = () => {
    if (isAnimating || cats.length === 0) return;
    
    setIsAnimating(true);
    setCenterIndex((prev) => (prev - 1 + cats.length) % cats.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (targetIndex) => {
    if (isAnimating || cats.length === 0 || targetIndex === centerIndex) return;
    
    setIsAnimating(true);
    setCenterIndex(targetIndex);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const getCard = (offset) => {
    if (cats.length === 0) return null;
    
    const index = (centerIndex + offset + cats.length) % cats.length;
    const cat = cats[index];
    const size = offset === 0 ? "center" : "side";
    
    return (
      <CatCard 
        key={`${cat.id}-${offset}`}
        image={cat.image}
        name={cat.name}
        size={size}
        onClick={() => goToSlide(index)}
      />
    );
  };

  if (isLoading) {
    return (
      <div className="slider-wrapper">
        <h1>Gatos en adopción</h1>
        <div className="loading">
          <p>Cargando adorables gatitos...</p>
        </div>
      </div>
    );
  }

  if (cats.length === 0) {
    return (
      <div className="slider-wrapper">
        <h1>Gatos en adopción</h1>
        <div className="error">
          <p>No se pudieron cargar los gatos. Intenta recargar la página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="slider-wrapper">
      <h1>Gatos en adopción</h1>
      <div className="cat-slider">
        <button 
          className="arrow left" 
          onClick={prev}
          disabled={isAnimating}
          aria-label="Anterior gato"
        >
          ‹
        </button>
        
        <div className="card-track">
          {getCard(-1)}
          {getCard(0)}
          {getCard(1)}
        </div>
        
        <button 
          className="arrow right" 
          onClick={next}
          disabled={isAnimating}
          aria-label="Siguiente gato"
        >
          ›
        </button>
      </div>
    </div>
  );
}