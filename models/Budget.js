const db = require('../db');

const budgetSchema = new db.Schema({
  user_id: {
    type: Number,
    required: true
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  goal_amount: {
    type: Number,
    required: true,
    min: 0
  },
  incomes: {
    type: Array,
  }
},
{
  timestamps: true
}
);


module.exports = db.model('budget', budgetSchema);
