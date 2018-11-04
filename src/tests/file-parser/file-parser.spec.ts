import 'mocha';
import { expect } from 'chai';
import { FileParser } from '../../utils/file-parser';
import * as path from 'path';

describe('class FileParser', () => {
  const parser = new FileParser();

  const validData = [
    { email: 'hello@gmail.com', url: 'https://coursehunters.net/' },
    { email: 'dada@tut', url: 'https://coursehunters.com' },
    { email: 'hello@tut.b', url: 'https:/coursehunters' }
  ];

  const invalidData = [
    { email: 'dada@tut', url: 'https://coursehunters.com' },
    { email: 'hello@tut.b', url: 'https:/coursehunters' }
  ];

  describe('parseCsv()', () => {
    // ============================== FIRST ============================================
    it('should correctly parse standart csv file', async () => {
      const CSV_PATH = path.join(__dirname, 'data.csv');

      const parsedCsv = await parser.parseCsv(CSV_PATH);
      expect(parsedCsv).to.eql(validData);
      expect(parsedCsv).to.not.eql(invalidData);
    });

    // ============================== SECOND ============================================
    it('should correctly parse csv file with "-" as separator', async () => {
      const CSV_PATH = path.join(__dirname, 'data.dash-separator.csv');

      const parsedCsv = await parser.parseCsv(CSV_PATH, '-');
      expect(parsedCsv).to.eql(validData);
      expect(parsedCsv).to.not.eql(invalidData);
    });
  }); // the end of describe parseCsv()
});
