import React, { useEffect, useState, useRef } from "react";
import { fetchCats } from "../../services/catService";
import CatCard from "../CatCard/CatCard";
import "./CatSlider.css";

export default function CatSlider() {
  const [cats, setCats] = useState([]);
  const [centerIndex, setCenterIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const sliderRef = useRef(null);
  const touchStartRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    async function loadCats() {
      try {
        setIsLoading(true);
        const catList = await fetchCats(15);
        setCats(catList);
        console.log('Gatos cargados:', catList);
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
    }, 300);
  };

  const prev = () => {
    if (isAnimating || cats.length === 0) return;
    
    setIsAnimating(true);
    setCenterIndex((prev) => (prev - 1 + cats.length) % cats.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const goToSlide = (targetIndex) => {
    if (isAnimating || cats.length === 0 || targetIndex === centerIndex) return;
    
    setIsAnimating(true);
    setCenterIndex(targetIndex);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  // Funciones para manejar el swipe
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setCurrentX(touch.clientX);
    setIsDragging(true);
    touchStartRef.current = touch.clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !isMobile) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const diff = touch.clientX - startX;
    setCurrentX(touch.clientX);
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging || !isMobile) return;
    
    const diff = currentX - startX;
    const threshold = 50; // Mínimo desplazamiento para activar swipe
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        prev(); // Swipe a la derecha = anterior
      } else {
        next(); // Swipe a la izquierda = siguiente
      }
    }
    
    // Reset
    setIsDragging(false);
    setTranslateX(0);
    setStartX(0);
    setCurrentX(0);
  };

  // Funciones para mouse (desktop)
  const handleMouseDown = (e) => {
    if (isMobile) return;
    
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isMobile) return;
    
    const diff = e.clientX - startX;
    setCurrentX(e.clientX);
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging || isMobile) return;
    
    const diff = currentX - startX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        prev();
      } else {
        next();
      }
    }
    
    setIsDragging(false);
    setTranslateX(0);
    setStartX(0);
    setCurrentX(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
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
        
        <div 
          ref={sliderRef}
          className={`card-track ${isAnimating ? 'animating' : ''} ${isDragging ? 'dragging' : ''}`}
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
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
      
      {/* Indicadores de posición */}
      <div className="slider-indicators">
        {cats.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === centerIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir al gato ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}