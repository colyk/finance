import moment from 'moment';
moment.locale('en-gb');

export const currencyIntl = amount =>
  new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(amount);
export const formatDate = (date, format) => moment(date).format(format);
export const formatMoment = (date, format) => moment(date, format);
export const nowMoment = moment();
export const _moment = moment;
