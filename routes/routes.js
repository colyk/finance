const UserController = require('../controllers/UserController');

module.exports = function (app) {
    app.post('/login', UserController.checkUser);
};