import React from "react";
import "./AdoptPage.css";
import wipCat from "../../assets/wip-cat.png";
import bgLight from "../../assets/background.png";
import bgDark from "../../assets/background-black.png";
import { useTheme } from "../../hooks/useTheme";
import { useTranslation } from "react-i18next";

function AdoptPage() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const bgImage = theme === "dark" ? bgDark : bgLight;
  
  return (
    <div className="adopt-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="content">
        <p>{t('adoptPage_wip_1')}</p>
        <p>{t('adoptPage_wip_2')}</p>
        <img src={wipCat} alt={t('adoptPage_alt_wip_cat')} />
      </div>
    </div>
  );
}

export default AdoptPage;