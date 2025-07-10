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
