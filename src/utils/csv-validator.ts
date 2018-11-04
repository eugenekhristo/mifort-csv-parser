import { CsvTypesWorker } from './type-workers';
import { CsvValidator } from './custom-csv-validator';
import { CsvValidationReport } from '../models/csv-validation-report.model';

export function validateParsedCsv(parsedCsv, csvConfig): CsvValidationReport {
  let invalidEntries = [];

  const CsvValidationReport = {
    valid: [],
    invalid: []
  };

  // go through array of items
  for (const csvItem of parsedCsv) {
    //go through each csv item (csv entries)
    for (const csvKey in csvItem) {
      let csvValue = csvItem[csvKey];

      // go throug config
      for (const configItem of csvConfig.csv) {
        if (csvKey === configItem.name) {
          // checking our type
          let isValidEntry = CsvTypesWorker[configItem.type](csvValue);

          //if isValid field - convert to apropriate type value of the item
          if (isValidEntry.isValid) {
            csvItem[csvKey] = isValidEntry.converted;
          }

          if (!isValidEntry.isValid) {
            invalidEntries.push({
              entry: { [csvKey]: csvValue },
              error: isValidEntry.error
            });
          } else {
            // only if type is valid go through custom validators
            // checking with custom validators
            for (const customValidator of configItem.validators) {
              isValidEntry = CsvValidator[customValidator.type](
                csvValue,
                customValidator.arguments
              );

              if (!isValidEntry.isValid) {
                invalidEntries.push({
                  entry: { [csvKey]: csvValue },
                  error: isValidEntry.error
                });
              }
            }
          }
        }
      }
    }

    if (invalidEntries.length > 0) {
      const invalidReport = {
        item: csvItem,
        entries: [...invalidEntries]
      };

      CsvValidationReport.invalid.push(invalidReport);
      invalidEntries = [];
    } else {
      CsvValidationReport.valid.push(csvItem);
    }
  }

  return CsvValidationReport;
}
