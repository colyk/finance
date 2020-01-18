const User = require('../controllers/User');
const Calendar = require('../controllers/Calendar');
const Budget = require('../controllers/Budget');
const Transaction = require('../controllers/Transaction');
const Category = require('../controllers/Category');

function addUserRoutes(app) {
  app.post('/login', User.checkUser);
  app.post('/signup', User.createUser);
}

function addTransactionRoutes(app) {
  app.post('/transaction', Transaction.createTransaction);
  app.get('/transaction', Transaction.getAllTransactions);
  app.put('/transaction', Transaction.updateTransaction);
  app.delete('/transaction', Transaction.deleteTransaction);
}

function addCategoryRoutes(app) {
  app.post('/category', Category.createCategory);
  app.get('/category', Category.getAllCategories);
}

function addBudgetRoutes(app) {
  app.get('/budget', Budget.getUserBudgets);
  app.post('/budget', Budget.createBudget);
  app.put('/budget', Budget.updateBudget);
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
};
