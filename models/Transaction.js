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
  categories: {
    type: [db.Schema.Types.Mixed],
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  monthDay: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = db.model('transaction', transactionSchema);
