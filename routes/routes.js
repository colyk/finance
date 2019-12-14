const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

module.exports = function (app) {
    router.get('/users', UserController.index);
    app.use('/', router);
};