import React from "react";
import "./Btn.css";

const Btn = ({
  label,
  to,
  onClick,
  bgcolor = "#30DE64",
  textcolor = "#000000",
  width = "auto",
  height = "auto",
  fontsize = "20px",
}) => {
  const handleClick = (e) => {
    if (to) {
      // Navegar a la ruta indicada
      window.location.href = to;
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className="btn-comp"
      onClick={handleClick}
      style={{
        color: textcolor,
        backgroundColor: bgcolor,
        fontSize: fontsize,
        width: width,
        height: height,
      }}
    >
      {label}
    </button>
  );
};

export default Btn;
