// utils/formulaParser.js

export const evaluateFormula = (formula, data) => {
    const regex = /([A-Za-z]+)\((.*?)\)/;
    const match = formula.match(regex);
  
    if (!match) {
      throw new Error("Invalid formula format.");
    }
  
    const functionName = match[1].toUpperCase();
    const range = match[2];
  
    const cells = parseRange(range, data);
  
    switch (functionName) {
      case "SUM":
        return cells.reduce((acc, num) => acc + num, 0);
      case "AVERAGE":
        return cells.reduce((acc, num) => acc + num, 0) / cells.length;
      case "MAX":
        return Math.max(...cells);
      case "MIN":
        return Math.min(...cells);
      default:
        throw new Error("Unsupported function.");
    }
  };
  
  const parseRange = (range, data) => {
    const rangeParts = range.split(":");
    const startCell = rangeParts[0].trim();
    const endCell = rangeParts[1].trim();
  
    const startRow = parseInt(startCell.slice(1)) - 1; // A1 => 0-based index
    const endRow = parseInt(endCell.slice(1)) - 1; // A3 => 2
  
    // Assuming we are working with Column 1 (Column 0 in index)
    const column = 0;
  
    const values = [];
    for (let i = startRow; i <= endRow; i++) {
      values.push(data[i][column]); // Fetching data from passed data array
    }
  
    return values;
  };
  