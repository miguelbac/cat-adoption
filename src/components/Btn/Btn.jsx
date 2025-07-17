import React from "react";
import "./Btn.css";

const Btn = ({
  label,
  to,
  onClick,
  bgcolor = "var(--btn-bg-color)",
  textcolor = "var(--btn-text-color)",
  width = "auto",
  height = "auto",
  fontsize = "20px",
}) => {
  const handleClick = (e) => {
    if (to) {
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
        backgroundColor: bgcolor,
        color: textcolor,
        width: width,
        height: height,
        fontSize: fontsize,
      }}
    >
      {label}
    </button>
  );
};

export default Btn;