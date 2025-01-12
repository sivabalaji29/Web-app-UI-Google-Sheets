import React from "react";
import './Toolbar.css';

const Toolbar = ({ onFontChange }) => {
  return (
    <div className="toolbar">
      <button onClick={() => onFontChange("bold")}>Bold</button>
      <button onClick={() => onFontChange("italic")}>Italic</button>
      <button onClick={() => onFontChange("increase")}>A+</button>
      <button onClick={() => onFontChange("decrease")}>A-</button>
    </div>
  );
};

export default Toolbar;
