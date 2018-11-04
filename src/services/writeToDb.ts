import * as mysql from 'mysql';
import 'colors';
import { CsvConfig } from '../models/csv-config.model';
import { CsvValidationReport } from '../models/csv-validation-report.model';

export function writeToDb(tableName: string, csvConfig: CsvConfig, csvValidationReport: CsvValidationReport) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sesame',
    database: 'nodemysql'
  });

  connection.connect(err => {
    if (err) throw err;
    console.log(`MySQL CONNECTED...\n`.rainbow);
  });

  let dynamicTableColumns = '';

  csvConfig.db.forEach((setting, id) => {
    if (id === csvConfig.db.length - 1) {
      dynamicTableColumns += `${setting.column} ${setting.type}`;
    } else {
      dynamicTableColumns += `${setting.column} ${setting.type}, `;
    }
  });

  let sqlCreateTable = `CREATE TABLE IF NOT EXISTS ${tableName}(id INT AUTO_INCREMENT PRIMARY KEY, ${dynamicTableColumns})`;

  connection.query(sqlCreateTable);

  const insertSql = `INSERT INTO ${tableName} SET ?`;

  for (const item of csvValidationReport.valid) {
    connection.query(insertSql, item, (err, result) => {
      if (err) throw err.message;
      console.log('WHOOOOOA! Some data are written into DB!'.bold);
    });
  }

  connection.end();
}