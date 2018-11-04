import {
  IsInvalidEntry,
  IsValidEntry
} from '../constructors/is-valid-entry-class';
import { Utils } from './utils';

export const CsvValidator = {
    Length(value, args) {
      let { min = 1, max = 100 } = args;
      if (min < 0) {
        min = 1;
      };
      const errMessage = `String "${value}" has invalid char length. Min char length - ${min}, max legnth - ${max} and actual one - ${
        value.length
      }`;
      const isValid = value.length >= min && value.length <= max;
  
      if (isValid) return new IsValidEntry(value);
      return new IsInvalidEntry(errMessage);
    },
  
    MinMax(value, args) {
      value = +value;
      const { min = 1, max = 125 } = args;
      const errMessage = `"${value}" is invalid. Min allowed value is ${min}, max - ${max} and actual one is - "${value}"`;
  
      const isValid = value >= min && value <= max;
  
      if (isValid) return new IsValidEntry(value);
      return new IsInvalidEntry(errMessage);
    },
  
    RegExp(value, args) {
      const { pattern } = args;
      const errMsg = `Value "${value}" has invalid format. Allowed pattern is "${pattern}"`;
      const isValid = pattern.test(value);
  
      if (isValid) {
        return new IsValidEntry(value);
      } else {
        return new IsInvalidEntry(errMsg);
      }
    },
  
    InverseRegExp(value, args) {
      const { pattern } = args;
      const errMsg = `Value "${value}" has invalid format. Values with pattern "${pattern}" are not allowed`;
      const isValid = pattern.test(value);
  
      if (!isValid) {
        return new IsValidEntry(value);
      } else {
        return new IsInvalidEntry(errMsg);
      }
    },
  
    MaxDate(value, args) {
      const { datePattern } = args;
      let maxDate;
      const allowedDatePattern = /^[\d]{4}-[\d]{2}-[\d]{2}$/;
      let passedDate = new Date(value);
  
      // PASSED NOW CASE
      if (datePattern === 'now') {
        maxDate = new Date();
        if (maxDate < passedDate) {
          return new IsInvalidEntry(`Max allowed Date is - ${Utils.dateFormat(maxDate)}, passed Date is - ${Utils.dateFormat(passedDate)}`);
        } else {
          return new IsValidEntry(value);
        }
      } 
  
      // PASSED PATTERN OF MAX DATE
      if (allowedDatePattern.test(datePattern)) {
        maxDate = new Date(datePattern);
        
        if (maxDate < passedDate) {
          return new IsInvalidEntry(`Max allowed Date is - ${Utils.dateFormat(maxDate)}, passed Date is - ${Utils.dateFormat(passedDate)}`);
        } else {
          return new IsValidEntry(value);
        }
      } else {
        throw new Error(`Sorry but when you are checking MaxDate - allowed pattern for argumetns are: 'now' or YYYY-MM-DD. Yours one is "${datePattern}"`);
      }
    } 
  };