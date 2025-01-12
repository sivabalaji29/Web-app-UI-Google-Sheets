import React, { useState } from "react";
import './App.css';
import Spreadsheet from './components/Spreadsheet';
import Toolbar from './components/Toolbar';

const App = () => {
  const [fontStyle, setFontStyle] = useState({
    bold: false,
    italic: false,
    fontSize: "16px",
  });

  const handleFontChange = (style) => {
    if (style === "bold") {
      setFontStyle((prev) => ({
        ...prev,
        bold: !prev.bold,
      }));
    } else if (style === "italic") {
      setFontStyle((prev) => ({
        ...prev,
        italic: !prev.italic,
      }));
    } else if (style === "increase") {
      setFontStyle((prev) => ({
        ...prev,
        fontSize: parseInt(prev.fontSize) + 2 + "px",
      }));
    } else if (style === "decrease") {
      setFontStyle((prev) => ({
        ...prev,
        fontSize: parseInt(prev.fontSize) - 2 + "px",
      }));
    }
  };

  return (
    <div className="App">
      <Toolbar onFontChange={handleFontChange} />
      <Spreadsheet fontStyle={fontStyle} />
    </div>
  );
};

export default App;
