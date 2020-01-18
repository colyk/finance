const Transaction = require('../models/Transaction');

createTransaction = (req, res) => {
  if (!req.session.userId)
    return res.status(400).json({ error: "User is not logged in" });

  const body = req.body;
  Transaction.create({
    count: body.expense.count,
    category: body.expense.category,
    year: body.expense.year,
    month: body.expense.month,
    day: body.expense.day,
    monthDay: body.expense.monthDay
  }, (err) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ message: 'Transaction not created' });
    }
    return res.status(200).json({});
  });
}

getAllTransactions = async (req, res) => {
  if (!req.session.userId)
    return res.status(400).json({ error: "User is not logged in" });

  transactions = await Transaction.find({ user_id: req.session.userId });
  return res.status(200).json({ transactions });
}

updateTransaction = async (req, res) => {
  if (!req.session.userId)
    return res.status(400).json({ error: "User is not logged in" });

  return res.status(400).json({ error: "Not implemented" });
}

deleteTransaction = async (req, res) => {
  if (!req.session.userId)
    return res.status(400).json({ error: "User is not logged in" });

  return res.status(400).json({ error: "Not implemented" });
}

module.exports = {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction
}
