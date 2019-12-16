const db = require('../db');

const calendarSchema = new db.Schema({});

module.exports = db.model('calendar', calendarSchema);
