import {
  IsInvalidEntry,
  IsValidEntry
} from '../constructors/is-valid-entry-class';
import { ConvertTo } from './convert-to';
import { Utils } from './utils';

export const CsvTypesWorker = {
  String(value) {
    const parsed = parseInt(value);
    const errMessage = `"${value}" is not valid String type. Because it is comprised only of digits.`;

    if (parsed) {
      return new IsInvalidEntry(errMessage);
    }

    return new IsValidEntry(value);
  },

  Email(value) {
    const regexp = /\b[\S]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+\b/;
    const errMessage = `"${value}" is not valid Email type. Valid format: \b[\S]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+\b`;

    const isValid = regexp.test(value);

    if (isValid) return new IsValidEntry(value);
    return new IsInvalidEntry(errMessage);
  },

  Integer(value) {
    const errMessage = `"${value}" is not valid Integer type. Integer can be comprised only of digits and minus sign - "-"`;
    const convertedInt = ConvertTo.Integer(value);
    const isValid = Utils.isInt(value);

    if (isValid) return new IsValidEntry(convertedInt);
    return new IsInvalidEntry(errMessage);
  },

  Phone(value) {
    const MAX_LENGTH = 20;
    const errMessageLength = `"${value}" is not valid Phone type. Length of phone cannot be more than ${MAX_LENGTH} chars, actual one is ${
      value.length
    } chars.`;
    const errMessageGeneral = `"${value}" is not valid Phone type. Check the phone number more accurately.`;

    value = value.trim();

    if (value.length > MAX_LENGTH) {
      return new IsInvalidEntry(errMessageLength);
    }

    // only these symbols are allowed
    const regexp = /^\+?[\d\s-\(\)]+$/;
    let isValidSignature = regexp.test(value);
    let converted;
    if (isValidSignature) {
      converted = ConvertTo.Phone(value);
    }

    if (converted) return new IsValidEntry(converted);
    return new IsInvalidEntry(errMessageGeneral);
  },

  Date(value) {
    try {
      const converted = ConvertTo.Date(value);
      return new IsValidEntry(converted);
    } catch (err) {
      return new IsInvalidEntry(err.message);
    }
  },

  Time(value) {
    try {
      const converted = ConvertTo.Time(value);
      return new IsValidEntry(converted);
    } catch (err) {
      return new IsInvalidEntry(err.message);
    }
  }
};
