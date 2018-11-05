// node packages
import * as path from 'path';
import * as readline from 'readline';
import { stdin, stdout } from 'process';
import 'colors';

// custom
import { FileParser } from './utils/file-parser';
import { csvConfig } from './csv-config';
import { validateParsedCsv } from './utils/csv-validator';
import { writeInvalidReportFile } from './utils/write-invalid-report';
import { writeToDb } from './services/writeToDb';
import { simulateProcessing } from './decorations/simulateProcessing';

const fileParser = new FileParser();

// LET'S ROOOOOOCK !!!!
async function runProgram(csvName: string) {
  try {
    const { separator } = csvConfig;
    const FILE_NAME = csvName;
    const parsedCsv = await fileParser.parseCsv(
      path.join(__dirname, FILE_NAME),
      separator
    );
    const csvValidationReport = validateParsedCsv(parsedCsv, csvConfig);
    writeInvalidReportFile(path.join(__dirname, 'invalid-csv-report.csv'), csvValidationReport);
    writeToDb('parsedCsv' ,csvConfig, csvValidationReport);

  } catch (err) {
    console.log(err);
  }
};


// READING INPUT (maybe put in separate file)
const onUserInput = async (csvName: string) => {
  await simulateProcessing();
  interfaceInstance.close();
  stdin.destroy();
  runProgram(csvName);
};

const interfaceInstance = readline.createInterface(stdin, stdout);
interfaceInstance.question('Enter a name of CSV file to parse: '.cyan, onUserInput);

