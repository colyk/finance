const db = require('../db');

const transactionSchema = new db.Schema({
  user_id: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  categories: {
    type: [db.Schema.Types.Mixed],
    required: true
  }
}, {
  timestamps: true
});

module.exports = db.model('transaction', transactionSchema);
