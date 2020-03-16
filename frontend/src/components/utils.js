import moment from 'moment';
moment.locale('en-gb');

export const currencyIntl = amount =>
  new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(amount);
export const formatDate = (date, format) => moment(date).format(format);
export const formatMoment = (date, format) => moment(date, format);
export const nowMoment = moment();
export const _moment = moment;

export const contrastTextColor = color => {
  const nThreshold = 105;
  const components = getRGBComponents(color);
  const bgDelta = components.R * 0.299 + components.G * 0.587 + components.B * 0.114;

  return 255 - bgDelta < nThreshold ? '#000000' : '#ffffff';
}

function getRGBComponents(color) {
  return {
    R: parseInt(color.substring(1, 3), 16),
    G: parseInt(color.substring(3, 5), 16),
    B: parseInt(color.substring(5, 7), 16),
  };
}
