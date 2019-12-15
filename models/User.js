const db = require('../db');

const userModel = db.Schema({
    username: String,
    password: String
}, {
    timestamps: true
});

module.exports = db.model('user', userModel);