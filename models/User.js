const db = require('../db');

const userSchema = new db.Schema({
    username: String,
    password: String
}, {
    timestamps: true
});

module.exports = db.model('user', userSchema);
