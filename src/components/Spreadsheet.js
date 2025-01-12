import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import './Spreadsheet.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Spreadsheet = ({ fontStyle }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('spreadsheetData');
    return savedData ? JSON.parse(savedData) : [["1", "2", "3"], ["3", "4", "5"], ["6", "7", "8"]];
  });

  const [formula, setFormula] = useState("");
  const [result, setResult] = useState("");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    localStorage.setItem('spreadsheetData', JSON.stringify(data)); // Save data to localStorage on change
  }, [data]);

  const handleChange = (row, col, value) => {
    const newData = [...data];
    newData[row][col] = value;
    setData(newData);
  };

  const applyFontStyle = (style) => {
    const appliedStyle = {};
    if (style.bold) appliedStyle.fontWeight = "bold";
    if (style.italic) appliedStyle.fontStyle = "italic";
    appliedStyle.fontSize = style.fontSize;
    return appliedStyle;
  };

  const calculateFormula = (formula) => {
    const parseRange = (range) => {
      const [start, end] = range.split(":");
      const startRow = parseInt(start[1]) - 1; // Row number is assumed to be 1-based, so subtract 1
      const endRow = parseInt(end[1]) - 1;
      return { startRow, endRow };
    };

    if (formula.startsWith("SUM")) {
      const range = formula.slice(4, -1); // Extract the range from SUM(A1:A3)
      const { startRow, endRow } = parseRange(range);
      let sum = 0;
      for (let row = startRow; row <= endRow; row++) {
        sum += parseInt(data[row][0]) || 0; // Assuming data is in the first column
      }
      setResult(sum);
    } else if (formula.startsWith("AVERAGE")) {
      const range = formula.slice(8, -1); // Extract the range from AVERAGE(A1:A3)
      const { startRow, endRow } = parseRange(range);
      let sum = 0, count = 0;
      for (let row = startRow; row <= endRow; row++) {
        sum += parseInt(data[row][0]) || 0;
        count++;
      }
      setResult(count > 0 ? sum / count : 0);
    } else if (formula.startsWith("MAX")) {
      const range = formula.slice(4, -1);
      const { startRow, endRow } = parseRange(range);
      let max = -Infinity;
      for (let row = startRow; row <= endRow; row++) {
        max = Math.max(max, parseInt(data[row][0]) || -Infinity);
      }
      setResult(max);
    } else if (formula.startsWith("MIN")) {
      const range = formula.slice(4, -1);
      const { startRow, endRow } = parseRange(range);
      let min = Infinity;
      for (let row = startRow; row <= endRow; row++) {
        min = Math.min(min, parseInt(data[row][0]) || Infinity);
      }
      setResult(min);
    } else if (formula.startsWith("COUNT")) {
      const range = formula.slice(6, -1);
      const { startRow, endRow } = parseRange(range);
      let count = 0;
      for (let row = startRow; row <= endRow; row++) {
        if (!isNaN(parseInt(data[row][0]))) count++;
      }
      setResult(count);
    } else {
      setResult("Invalid Formula");
    }
  };

  const addRow = () => {
    const newData = [...data, Array(data[0].length).fill("")];
    setData(newData);
  };

  const removeRow = () => {
    if (data.length > 1) {
      const newData = data.slice(0, data.length - 1);
      setData(newData);
    }
  };

  const addColumn = () => {
    const newData = data.map(row => [...row, ""]);
    setData(newData);
  };

  const removeColumn = () => {
    if (data[0].length > 1) {
      const newData = data.map(row => row.slice(0, row.length - 1));
      setData(newData);
    }
  };

  const saveSpreadsheet = () => {
    localStorage.setItem('spreadsheetData', JSON.stringify(data));
    alert("Spreadsheet saved.");
  };

  const loadSpreadsheet = () => {
    const savedData = localStorage.getItem('spreadsheetData');
    if (savedData) {
      setData(JSON.parse(savedData));
      alert("Spreadsheet loaded.");
    } else {
      alert("No saved data found.");
    }
  };

  const generateChart = () => {
    const chartValues = data.map(row => parseInt(row[0]) || 0);
    setChartData({
      labels: chartValues.map((_, index) => `Row ${index + 1}`),
      datasets: [
        {
          label: "Values",
          data: chartValues,
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
        },
      ],
    });
  };

  // Data Quality Functions
  const trimData = () => {
    const newData = data.map(row => row.map(cell => (typeof cell === "string" ? cell.trim() : cell)));
    setData(newData);
  };

  const convertToUpper = () => {
    const newData = data.map(row => row.map(cell => (typeof cell === "string" ? cell.toUpperCase() : cell)));
    setData(newData);
  };

  const convertToLower = () => {
    const newData = data.map(row => row.map(cell => (typeof cell === "string" ? cell.toLowerCase() : cell)));
    setData(newData);
  };

  const removeDuplicates = () => {
    const uniqueData = [];
    data.forEach(row => {
      if (!uniqueData.some(existingRow => JSON.stringify(existingRow) === JSON.stringify(row))) {
        uniqueData.push(row);
      }
    });
    setData(uniqueData);
  };

  const findAndReplace = (findText, replaceText) => {
    const newData = data.map(row =>
      row.map(cell => (typeof cell === "string" && cell.includes(findText) ? cell.replace(findText, replaceText) : cell))
    );
    setData(newData);
  };

  return (
    <div className="spreadsheet">
      <div className="controls">
        <div className="formula-section">
          <input
            type="text"
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            placeholder="Enter formula (e.g., SUM(A1:A3))"
          />
          <button onClick={() => calculateFormula(formula)}>Calculate</button>
        </div>

        <div className="data-quality-controls">
          <button onClick={trimData}>Trim Data</button>
          <button onClick={convertToUpper}>Convert to Upper</button>
          <button onClick={convertToLower}>Convert to Lower</button>
          <button onClick={removeDuplicates}>Remove Duplicates</button>
          <button onClick={() => {
            const findText = prompt("Enter text to find");
            const replaceText = prompt("Enter text to replace");
            findAndReplace(findText, replaceText);
          }}>Find and Replace</button>
          <button onClick={saveSpreadsheet}>Save Spreadsheet</button>
          <button onClick={loadSpreadsheet}>Load Spreadsheet</button>
          <button onClick={generateChart}>Generate Chart</button>
        </div>

        <div className="data-controls">
          <button onClick={addRow}>Add Row</button>
          <button onClick={removeRow}>Remove Row</button>
          <button onClick={addColumn}>Add Column</button>
          <button onClick={removeColumn}>Remove Column</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            {data[0].map((_, colIndex) => (
              <th key={colIndex}>Column {colIndex + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>Row {rowIndex + 1}</td>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cell}
                    style={applyFontStyle(fontStyle)}
                    onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="result">
        <strong>Result:</strong> {result}
      </div>

      {chartData && (
        <div className="chart">
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default Spreadsheet;





