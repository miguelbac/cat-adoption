import React from "react";
import "./CatCard.css";
import Btn from "../Btn/Btn";
import { useTranslation } from "react-i18next";

function CatCard({ image, name, size = "side", onClick }) {
  const { t } = useTranslation();

  const handleClick = () => {
    if (size === "side" && onClick) {
      onClick();
    }
  };

  return (
    <div className={`cat-card ${size}`} onClick={handleClick}>
      <img
        src={image}
        alt={t('catCard_alt', { name: name })}
        onError={(e) => {
          e.target.src = "https://placekitten.com/200/200";
        }}
      />
      <h2>{name}</h2>
      {size === "center" && (
        <Btn
          label={t('catCard_adoptMe')}
          to="/adopt"
          bgcolor="#91eda7"
          textcolor="#ffffff"
          width="120px"
          height="30px"
          fontsize="18px"
        />
      )}
    </div>
  );
}

export default CatCard;