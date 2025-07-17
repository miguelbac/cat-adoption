import React from "react";
import "./AdoptPage.css";
import bgLight from "../../assets/background.png";
import bgDark from "../../assets/background-black.png";
import { useTheme } from "../../hooks/useTheme";
import FormUserdata from '../../components/FormUserData/FormUserData';

function AdoptPage() {
  const { theme } = useTheme();
  const bgImage = theme === "dark" ? bgDark : bgLight;
  
return (
  <div className="adopt-page" style={{ backgroundImage: `url(${bgImage})` }}>
    <FormUserdata />
  </div>
);
}

export default AdoptPage;