const UserController = require('../controllers/UserController');
const CalendarController = require('../controllers/CalendarController');

module.exports = function (app) {
    app.post('/login', UserController.checkUser);
    app.post('/signup', UserController.createUser);
    app.get('/holidays', CalendarController.getHolidays);
    app.get('/workdays', CalendarController.getWorkdays);
};
