const csv = require('csv-parser');
import * as fs from 'fs';

export class FileParser<T> {

  parseCsv(path: string, separator: string = ','): Promise<Array<T>> {
    const results: T[] = [];

    return new Promise((resolve) => {
      fs.createReadStream(path)
        .pipe(csv({separator}))
        .on('data', (data: T) => {
          results.push(data);
        })
        .on('end', () => {
          resolve(results);
        })
    });
  }

}



