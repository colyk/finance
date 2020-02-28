const User = require('../controllers/User');
const Calendar = require('../controllers/Calendar');
const Budget = require('../controllers/Budget');
const Transaction = require('../controllers/Transaction');
const Category = require('../controllers/Category');
const Analytic = require('../controllers/Analytic');

const Validator = require('../controllers/Validator');

function addUserRoutes(app) {
  app.post('/login', User.checkUser);
  app.post('/signup', User.createUser);
}

function addAnalyticRoutes(app) {
  app.get('/analytic', Analytic.getAnalytics);
}

function addTransactionRoutes(app) {
  app.get('/transaction', Transaction.getAllTransactions);
  app.post('/transaction', Validator.transactionValidation(), Transaction.createTransaction);
  app.put('/transaction', Transaction.updateTransaction);
  app.delete('/transaction', Transaction.deleteTransaction);
}

function addCategoryRoutes(app) {
  app.get('/category', Category.getAllCategories);
  app.post('/category', Category.createCategory);
  app.put('/category', Category.updateCategory);
  app.delete('/category', Category.deleteCategory);
}

function addBudgetRoutes(app) {
  app.get('/budget', Budget.getUserBudgets);
  app.post('/budget', Validator.budgetValidation(), Budget.createBudget);
  app.put('/budget', Validator.budgetValidation(), Budget.updateBudget);
  app.delete('/budget', Budget.deleteBudget);
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
  addAnalyticRoutes(app);
};
