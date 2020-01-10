const db = require('../db');

const categorySchema = new db.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    }
}, {
    versionKey: false
});

module.exports = db.model('categories', categorySchema);
