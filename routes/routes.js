const UserController = require('../controllers/UserController');
const CalendarController = require('../controllers/CalendarController');
const IncomeController = require('../controllers/IncomeController');
const ExpensesController = require('../controllers/ExpensesController');
const CategoryController = require('../controllers/CategoryController');


module.exports = function (app) {
    app.post('/login', UserController.checkUser);
    app.post('/signup', UserController.createUser);
    app.post('/incomes', IncomeController.createIncome);
    app.post('/expenses', ExpensesController.createExpense);
    app.post('/categories', CategoryController.createCategory);
    app.post('/allcategories', CategoryController.selectAllCategories);
    app.get('/holidays', CalendarController.getHolidays);
    app.get('/workdays', CalendarController.getWorkdays);
};
