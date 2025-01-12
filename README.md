# Web-app-UI-Google-Sheets

A feature-rich spreadsheet application built with React, offering dynamic data manipulation, formula calculations, chart generation, and data cleaning tools in an intuitive interface.

# **Features**
Core Functionalities
Data Editing:

Easily edit, add, or remove rows and columns.
Cells are fully editable, allowing for dynamic updates.
# **Formula Support:**

Perform calculations directly in the app using formulas.
# **Example:**
SUM(A1:A3) - Adds values from cells A1 to A3.
AVERAGE(A1:A3) - Finds the average of values in the range.
MAX(A1:A3) - Returns the maximum value in the range.
COUNT(A1:A3) - Counts the numeric entries in the range.
**Result Display:**

Outputs the result of your formula below the spreadsheet for easy reference.
# **Data Quality Tools**
**Trim Data:** Removes unnecessary leading and trailing spaces in cell content.

**Convert to Upper/Lower:** Changes text case to either uppercase or lowercase for uniformity.

**Remove Duplicates:** Ensures unique rows in your dataset by eliminating duplicates.

**Find and Replace:** Search for specific text in your spreadsheet and replace it with new values.

# **Data Persistence**

**Save Spreadsheet:** Save your current spreadsheet to local storage.

**Load Spreadsheet:** Load previously saved data for continued editing.

# **Visualization**

**Generate Chart:** Create a line chart representation of the data in your spreadsheet.

This feature is perfect for visualizing trends or comparing row values.

# **User Interface**

**Bold/Italic Styling:** Apply bold or italic formatting to cell content.

**Dynamic Result Display:** View formula results instantly in the "Result" section.

# **How to Use**

Getting Started

Launch the application.

Start entering values in the cells.

Use the formula input to calculate values (e.g., SUM(A1:A3)) and click Calculate.

# **Use the toolbar to:**

Add or remove rows and columns.

Clean up data using quality tools like trim, convert, or deduplicate.

Save or load your spreadsheet for later use.

Generate charts for data visualization.

# **Example Workflow**

Input numbers in the first column of the spreadsheet.
Enter a formula such as SUM(A1:A3) in the formula bar.
Click Calculate to display the result.
Use Trim Data or Convert to Upper to clean text fields if needed.
Save the spreadsheet or generate a chart for visualization.

# **Technologies Used**

**Frontend:** React

**Styling:** Custom CSS

**Charting Library:** Chart.js

**Installation**

**Prerequisites**

Node.js installed on your system.

# Steps
# Clone the repository:

bash
git clone https://github.com/sivabalaji29/Web-app-UI-Google-Sheets.git

Navigate into the project directory:

bash
cd react-spreadsheet-app

Install dependencies:

bash
npm install

Run the app:

bash
npm start

Open your browser and navigate to http://localhost:3000.

# Screenshots

![Screenshot 2025-01-12 164508](https://github.com/user-attachments/assets/436b5f4b-8cfa-437b-8dcf-59f5d5775432)

![Screenshot 2025-01-12 170314](https://github.com/user-attachments/assets/d577c206-381b-4c1d-8abe-70a1fdcb9883)


Contributing
Fork the repository.
Create a feature branch:
bash

git checkout -b feature-name
Commit your changes:
bash

git commit -m "Add feature description"

Push your branch:
bash

git push origin feature-name
Open a pull request.
