const User = require('../controllers/User');
const Calendar = require('../controllers/Calendar');
const Budget = require('../controllers/Budget');


module.exports = function (app) {
  app.post('/login', User.checkUser);
  app.post('/signup', User.createUser);

  app.get('/holidays', Calendar.getHolidays);
  app.get('/workdays', Calendar.getWorkdays);

  app.get('/budget', Budget.getUserBudgets);
};
