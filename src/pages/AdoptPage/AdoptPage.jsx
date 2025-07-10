import React from "react";
import "./AdoptPage.css";
import wipCat from "../../assets/wip-cat.png";
import bgImage from "../../assets/background.png";
import CatSlider from "../../components/CatSlider/CatSlider";


function AdoptPage() {
  return (
    <div className="adopt-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="content">
        <p>¡El gato trabaja todo lo rápido que puede!</p>
        <p>
          La página de adopción estará lista tan pronto como nos sea posible.
        </p>
        <img src={wipCat} alt="Cato currela" />
      </div>
    </div>
  );
}

export default AdoptPage;
import React from 'react';

export default function AdoptPage() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Página de Adopción</h1>
      <p>En construcción… ¡Vuelve pronto para ver gatitos disponibles!</p>
    </main>
  );
}