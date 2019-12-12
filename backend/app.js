const express = require('express');

const app = express();

const hello = require('./routes/hello');
app.use('/hello', hello);

module.exports = app;