const db = require('../db');

const categorySchema = new db.Schema({
  user_id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  }
});

module.exports = db.model('categories', categorySchema);
