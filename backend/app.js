const express = require('express');
const app = express();

require('express-async-errors');
require('./routes')(app);

module.exports = app;