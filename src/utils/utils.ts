import * as moment from 'moment';

export const Utils = {
  isInt(value: any) {
    return (
      !isNaN(value) && parseInt(value) == value && !isNaN(parseInt(value, 10))
    );
  },

  dateFormat(date, format = 'YYYY-MM-DD') {
    return moment(date).format(format);
  }
};
