import React from "react";
import "./AdoptPage.css";
import wipCat from "../../assets/wip-cat.png";
import bgLight from "../../assets/background.png";
import bgDark from "../../assets/background-black.png";
import CatSlider from "../../components/CatSlider/CatSlider";
import { useTheme } from "../../hooks/useTheme"; // 👈 Hook del contexto

function AdoptPage() {
  const { theme } = useTheme(); // 👈 Accede al tema actual
  const bgImage = theme === "dark" ? bgDark : bgLight; // 👈 Cambia imagen según tema
  
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
