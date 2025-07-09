import React from "react";
import "./Btn.css";

/**
 * A customizable button component that supports custom text, background color, text color, and font size.
 *
 * @component
 *
 * @param {Object} props - The component's props.
 * @param {string} props.label - The text displayed on the button.
 * @param {() => void} props.onClick - Callback function triggered when the button is clicked.
 * @param {string} [props.bgcolor="#30DE64"] - Background color of the button. Defaults to green.
 * @param {string} [props.textcolor="#000000"] - Text color of the button. Defaults to black.
 * @param {string} [props.fontsize="20px"] - Font size of the button text. Defaults to 20px.
 *
 * @example
 * <Btn
 *   label="Click me"
 *   onClick={() => alert("Clicked!")}
 *   bgcolor="#FF5733"
 *   textcolor="#FFFFFF"
 *   fontsize="18px"
 * />
 */

const Btn = ({
  label,
  onClick,
  bgcolor = "#30DE64",
  textcolor = "#000000",
  fontsize = "20px",
}) => {
  return (
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
  );
};

export default Btn;
