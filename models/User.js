const db = require('../db');

const userModel = new db.Schema({
    username: String,
    password: String
}, {
    timestamps: true
});

module.exports = db.model('user', userModel);