import 'mocha';
import { expect } from 'chai';
import { Utils } from '../utils/utils';

describe('Utils object', () => {
  describe('isInt()', () => {
    it('should return true if the passed value is Int', () => {
      expect(Utils.isInt(12)).to.be.ok;
    });

    it('should return true if the passed value is stringified Int', () => {
      expect(Utils.isInt('12')).to.be.ok;
    });

    it('should return false if the passed value is pure string', () => {
      expect(Utils.isInt('hello')).to.not.be.ok;
    });

    it('should return false if the value starts as number but containts other symbols', () => {
      expect(Utils.isInt('123abc')).to.not.be.ok;
    });

    it('should return false if the numeric value is fractional', () => {
      expect(Utils.isInt(23.233)).to.not.be.ok;
    });
  });

  describe('dateFormat()', () => {
    it('should return valid date in "YYYY-MM-DD" format by default', () => {
      expect(Utils.dateFormat('12-23-2018')).to.equal('2018-12-23');
      expect(Utils.dateFormat('23-07-2018')).to.equal('2018-07-23');
    });

    it('should return "Invalid date" if date format is incorrect', () => {
      expect(Utils.dateFormat('23-0-2018')).to.be.equal('Invalid date');
      expect(Utils.dateFormat('123-11-2018')).to.be.equal('Invalid date');
    });

    it('should return date in specified format', () => {
      expect(Utils.dateFormat('13-01-2018', 'MM-DD-YY')).to.be.equal('01-13-18');
    })
  });
});