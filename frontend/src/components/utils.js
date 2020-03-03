import moment from 'moment';
moment.locale('en-gb');

export const currencyIntl = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' });
export const formatDate = (date, format) => moment(date).format(format);
