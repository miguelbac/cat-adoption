import React from "react";
import "./HomePage.css";
import bgImage from "../../assets/background.png";
import CatSlider from "../../components/CatSlider/CatSlider";


function HomePage() {
  return (
    <div className="home-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="content">
        <CatSlider/>
      </div>
    </div>
  );
}

export default HomePage;
import React from 'react';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Página de Inicio</h1>
      <p>¡Bienvenido a la aplicación de adopción de gatitos!</p>
    </main>
  );
}