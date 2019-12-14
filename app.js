const express = require('express');
const app = express();

require('express-async-errors');
require('./routes')(app);

// if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })

// }

module.exports = app;