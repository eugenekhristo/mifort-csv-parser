import * as moment from 'moment';

export const Utils = {
  isInt(value: any): boolean {
    return  value <= 2147483647 
    && value >= -2147483648 
    && !isNaN(value) 
    && parseInt(value) == value 
    && !isNaN(parseInt(value, 10));
  },

  dateFormat(date: string, format = 'YYYY-MM-DD'): string {
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
    return moment(date, allowedFormats, true).format(format);
  }
};
