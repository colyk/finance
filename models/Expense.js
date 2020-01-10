const db = require('../db');

const expenseSchema = new db.Schema({
    count: {
        type: Number,
        required: true,
    },
    category: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    day: {
        type: Number,
        required: true,
    },
    monthDay: {
        type: Number,
        required: true,
    }
}, {
    versionKey: false
});

module.exports = db.model('expense', expenseSchema);
