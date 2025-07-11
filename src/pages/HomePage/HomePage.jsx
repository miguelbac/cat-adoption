import React from "react";
import "./HomePage.css";
import bgImage from "../../assets/background.png";
import CatSlider from "../../components/CatSlider/CatSlider";
import CallToAction from "../../components/CallToAction/CallToAction";

function HomePage() {
  return (
    <div className="home-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="content">
        <CatSlider />
        <CallToAction/>
      </div>
    </div>
  );
}

export default HomePage;
