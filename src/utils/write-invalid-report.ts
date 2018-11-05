import { CsvValidationReport } from "../models/csv-validation-report.model";
import * as fs from 'fs';
import 'colors';

 /**
   * Write a new file with given name in the root directory of the project. File contains filtered out incorrect data and also reasons why the data is incorrect.
   *@param filePath absolute path of the file to write to
   *@param report object of CsvValidationReport type to be able extract needed info
   *@param separator separator/delimeter which data should be separated with
   */
  export function writeInvalidReportFile( filePath: string, report: CsvValidationReport,  separator: string = ','): void {
    let finalReport: string = '';
    const headers = extractHeaders(report, separator) + `\n`;
    const delimeters = '-'.repeat(headers.length * 2) + '\n';
    finalReport += headers;
    

    const { invalid: invalidList } = report;
    for (const invalid of invalidList) {
      finalReport += delimeters
      const row = Object.values(invalid.item).join(separator) + '\n';
      finalReport += row;
      finalReport += delimeters;
        
      // go through invalid entries for each csv row
       for (const invalidEntry of invalid.entries) {
        finalReport += `In column "${Object.keys(invalidEntry.entry)[0]}" value - "${Object.values(invalidEntry.entry)[0]}" is invalid. REASON - ${invalidEntry.error}\n`
       }


    }
    
    fs.writeFile(
      filePath,
      finalReport,
      err => { 
        if (err) throw err;
        // TODO: if different OS - check if there's / or \ - and then split by appropriate slash
        const filename = filePath.split('\\').slice(-1)[0];
        console.log(`${filename} are written in your src/ directory!\n`.yellow);
      }
    )

  }

  function extractHeaders(report: CsvValidationReport, separator: string = ','): string {
    const { valid, invalid } = report;

    function returnHeaders(item: {}) {
      const headers = Object.keys(item).join(separator);
      return headers;
    }

    if (valid.length > 0) {
      return returnHeaders(valid[0]);
    }

    if (invalid.length > 0) {
      return returnHeaders(invalid[0].item);
    }

    throw new Error(`csvValidationReport is empty!`);
  }