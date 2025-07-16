import React from "react";
import "./HomePage.css";
import bgLight from "../../assets/background.png";
import bgDark from "../../assets/background-black.png";
import CatSlider from "../../components/CatSlider/CatSlider";
import CallToAction from "../../components/CallToAction/CallToAction";
import { useTheme } from "../../hooks/useTheme";
import FormUserData from "../../components/FormUserData/FormUserData";

function HomePage() {
  const { theme } = useTheme();
  const bgImage = theme === "dark" ? bgDark : bgLight;

  return (
    <div className="home-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="content">
        <CatSlider />
        <CallToAction />
        <FormUserData />
      </div>
    </div>
  );
}

export default HomePage;
