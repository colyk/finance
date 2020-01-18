const User = require('../controllers/User');
const Calendar = require('../controllers/Calendar');
const Budget = require('../controllers/Budget');
const Income = require('../controllers/Income');
const Expense = require('../controllers/Expense');
const Category = require('../controllers/Category');

function addUserRoutes(app) {
  app.post('/login', User.checkUser);
  app.post('/signup', User.createUser);
}

function addTransactionRoutes(app) {
  app.post('/incomes', Income.createIncome);
  app.post('/getallincomes', Income.getAllIncomes);
  app.post('/expenses', Expense.createExpense);
  app.post('/getallexpenses', Expense.getAllExpenses);
}

function addCategoryRoutes(app) {
  app.post('/category', Category.createCategory);
  app.get('/category', Category.getAllCategories);
}

function addBudgetRoutes(app) {
  app.get('/budget', Budget.getUserBudgets);
  app.post('/budget', Budget.createBudget);
  app.delete('/budget', Budget.deleteBudget);
  app.put('/budget', Budget.updateBudget);
}

function addCalendarRoutes(app) {
  app.get('/holidays', Calendar.getHolidays);
  app.get('/workdays', Calendar.getWorkdays);
}

module.exports = function (app) {
  addUserRoutes(app);
  addTransactionRoutes(app);
  addCategoryRoutes(app);
  addCalendarRoutes(app);
  addBudgetRoutes(app);
};
