# CSV-PARSER (task) 🔥 
This is a task implementation of CSV-parser. All stuff implemented with **TypeScript** in **Node.js** environment. As a DBMS was used **MySQL**.  Tests written in TypeScript too with **mocha**, **chai** and **nyc**. 

> _PS_ Currently project is in ALPHA stage of development and may work incorrectly.

## Usage
Just clone this repo locally. After run `npm i`. Put your `.csv` file into `src/` directory. After in `src/` there is `csv-config.ts` where you have to provide some info about your `.csv`'s file columns. Finally run **`npm start`** and follow instructions in your CLI.

## Example
- `.csv` file example :

<img src="https://pp.userapi.com/c851432/v851432567/3b3bc/OaepSR85cEY.jpg" title="CSV file example">


- typing `npm start`:

 <img src="https://pp.userapi.com/c851432/v851432567/3b389/pDfgi5lf7VA.jpg" title="Interface of the program">
  
- example snippet of `invalid-csv-report.csv`:

 <img src="https://pp.userapi.com/c851432/v851432567/3b3a3/h015TRMPRG4.jpg" title="Invalid report">

- in `MySQL` dynamically created table and written valid data:

 <img src="https://pp.userapi.com/c845021/v845021498/12e605/bENqdaZTrDg.jpg" title="Valid data are written into Database">

 ## Testing
 - type `npm test` for testing app with mocha.
 - type `npm run coverage` for getting test coverage report.
  > Example of test coverage report:

 <img src="https://pp.userapi.com/c849432/v849432498/bc818/ZdEglOmkCnE.jpg" title="Test Coverage Example" width="500">
