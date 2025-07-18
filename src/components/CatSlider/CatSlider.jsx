import React, { useEffect, useState, useRef } from "react";
import { fetchCats } from "../../services/catService";
import CatCard from "../CatCard/CatCard";
import "./CatSlider.css";
import { useTranslation } from "react-i18next";

export default function CatSlider() {
  const { t } = useTranslation();
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
    let isMounted = true;
    
    async function loadCats() {
      try {
        setIsLoading(true);
        const catList = await fetchCats(15);
        
        // Solo actualizar el estado si el componente sigue montado
        if (isMounted) {
          setCats(catList);
          console.log('Gatos cargados:', catList);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error cargando gatos:', error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    
    loadCats();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
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

    if (!cat || !cat.id || !cat.image || !cat.name) {
      console.warn("Gato inválido en índice:", index, cat);
      return null;
    }

    return (
      <CatCard 
        key={`${cat.id}-${offset}`}
        image={cat.image}
        name={cat.name}
        size={size}
        onClick={() => goToSlide(index)}
        catData={cat}
      />
    );
  };

  if (isLoading) {
    return (
      <div className="slider-wrapper">
        <h1>{t('slider_title')}</h1>
        <div className="loading">
          <p>{t('slider_loading')}</p>
        </div>
      </div>
    );
  }

  if (cats.length === 0) {
    return (
      <div className="slider-wrapper">
        <h1>{t('slider_title')}</h1>
        <div className="error">
          <p>{t('slider_error')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="slider-wrapper">
      <h1>{t('slider_title')}</h1>
      <div className="cat-slider">
        <button 
          className="arrow left" 
          onClick={prev}
          disabled={isAnimating}
          aria-label={t('slider_aria_prev')}
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
          aria-label={t('slider_aria_next')}
        >
          ›
        </button>
      </div>
      
      <div className="slider-indicators">
        {cats.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === centerIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={t('slider_aria_goto', { number: index + 1 })}
          />
        ))}
      </div>
    </div>
  );
}