import React from "react";
import "./Btn.css";

const Btn = ({
  label,
  onClick,
  bgcolor = "#30DE64",
  textcolor = "#000000",
  fontsize = "20px",
}) => {
  return (
    <div>
      <button
        className="btn-comp"
        onClick={onClick}
        style={{
          color: textcolor,
          backgroundColor: bgcolor,
          fontSize: fontsize,
        }}
      >
        {label}
      </button>
    </div>
  );
};

export default Btn;
