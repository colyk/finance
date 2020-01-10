const User = require('../controllers/User');
const Calendar = require('../controllers/Calendar');
const Budget = require('../controllers/Budget');
const Income = require('../controllers/Income');
const Expense = require('../controllers/Expense');
const Category = require('../controllers/Category');

module.exports = function (app) {
    app.post('/login', User.checkUser);
    app.post('/signup', User.createUser);
    app.post('/incomes', Income.createIncome);
    app.post('/getallincomes', Income.getAllIncomes);
    app.post('/expenses', Expense.createExpense);
    app.post('/getallexpenses', Expense.getAllExpenses);
    app.post('/categories', Category.createCategory);
    app.post('/allcategories', Category.getAllCategories);
    app.get('/holidays', Calendar.getHolidays);
    app.get('/workdays', Calendar.getWorkdays);
    app.get('/budget', Budget.getUserBudgets);
};
