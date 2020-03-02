const Transaction = require('../models/Transaction');
const { validationResult } = require('express-validator');

createTransaction = (req, res) => {
  if (!req.session.userId)
    return res.status(400).json({ error: "User is not logged in" });

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const body = req.body;
  Transaction.create({
    user_id: req.session.userId,
    title: body.title,
    amount: body.amount,
    type: body.type,
    categories: body.selectedCategories,
    year: body.year,
    month: body.month + 1, //January is 0
    day: body.day,
    monthDay: body.monthDay //Sanday is 0 and Monday is 1
  }, (err) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ error: 'Transaction not created' });
    }
    return res.status(200).json({});
  });
}

getAllTransactions = async (req, res) => {
  if (!req.session.userId)
    return res.status(400).json({ error: "User is not logged in" });

  const count = await Transaction.count({ user_id: req.session.userId });
  const transactionsCountPerPage = parseInt(req.query.count);
  let page = parseInt(req.query.page);

  if (page < 1 || count <= transactionsCountPerPage) page = 1;
  if (page > Math.ceil(count / transactionsCountPerPage)) page--;

  const transactions = await Transaction.find({ user_id: req.session.userId })
    .skip((transactionsCountPerPage * page) - transactionsCountPerPage)
    .sort({ updatedAt: -1 })
    .limit(transactionsCountPerPage);
  return res.status(200).json({ transactions, count });
}

updateTransaction = async (req, res) => {
  if (!req.session.userId)
    return res.status(400).json({ error: "User is not logged in" });

  return res.status(400).json({ error: "Not implemented" });
}

deleteTransaction = (req, res) => {
  const userId = req.session.userId || req.query.api_key;
  if (!userId)
    return res.status(400).json({ error: "User is not logged in" });

  const query = req.query;
  if (!query._id)
    return res.status(400).json({ error: "Id is not defined" });

  Transaction.findOneAndDelete({ _id: query._id },
    (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: 'Transaction was not deleted' });
      }
      return res.status(200).json();
    });
}

module.exports = {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction
}
