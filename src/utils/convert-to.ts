import * as moment from 'moment';
const phone = require('phone');

export const ConvertTo = {
  Integer(value) {
    return parseInt(value);
  },

  Phone(value) {
    const converted = phone(`+${value}`);
    return converted.length > 0 ? converted[0] : '';
  },

  Date(value) {
    const allowedFormats = [
      'MM-DD-YYYY',
      'MM/DD/YYYY',
      'MM.DD.YYYY',
      'DD-MM-YYYY',
      'DD/MM/YYYY',
      'DD.MM.YYYY',
      'YYYY-MM-DD',
      'YYYY/MM/DD',
      'YYYY.MM.DD'
    ];
    const parsedDate = moment(value, allowedFormats, true).format('YYYY-MM-DD');

    if (parsedDate === 'Invalid date') {
      throw new Error(
        `Sorry, but "${value}" is not valid Date type. Allowed formats: [${allowedFormats}]`
      );
    } else {
      return parsedDate;
    }
  },

  Time(value) {
    const parsedTime = moment(value, ['H:mm', 'h:mm a'], true).format(
      'HH:mm:ss'
    );

    if (parsedTime === 'Invalid date') {
      throw new Error(
        `Sorry, but "${value}" is not valid Time type. Allowed formats: ['H:mm', 'h:mm AM/PM]`
      );
    } else {
      return parsedTime;
    }
  }
};