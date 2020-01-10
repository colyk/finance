const db = require('../db');

const incomeSchema = new db.Schema({
    count: {
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
    }
}, {
    versionKey: false
});

module.exports = db.model('income', incomeSchema);
