const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const { validationResult } = require('express-validator');

createTransaction = (req, res) => {
  const userId = req.session.userId || req.body.api_key;
  if (!userId)
    return res.status(400).json({ error: "User is not logged in" });

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const body = req.body;
  Transaction.create({ ...body, user_id: userId }, (err, transaction) => {

    if (err) {
      console.log(err)
      return res.status(400).json({ error: 'Transaction not created' });
    }
    Budget.findOne({ user_id: userId, _id: body.budget_id }, async function (_, budget) {
      budget.incomes.push(transaction._id);
      await budget.save();
    });
    return res.status(200).json({});
  });
}

getAllTransactions = async (req, res) => {
  const userId = req.session.userId || req.query.api_key;
  if (!userId)
    return res.status(400).json({ error: "User is not logged in" });

  const transactionsCountPerPage = parseInt(req.query.count);
  let page = parseInt(req.query.page);
  const from = req.query.from;
  const to = req.query.to;

  let find = { user_id: userId };
  if (from !== 'null' && to === 'null') find = { user_id: userId, date: { '$gte': from } };
  if (from === 'null' && to !== 'null') find = { user_id: userId, date: { '$lte': to } };
  if (from !== 'null' && to !== 'null') find = { user_id: userId, date: { '$gte': from, '$lte': to } };

  const count = await Transaction.count(find);
  if (page > Math.ceil(count / transactionsCountPerPage)) page--;
  if (page < 1 || count <= transactionsCountPerPage) page = 1;

  const transactions = await Transaction.find(find)
    .skip((transactionsCountPerPage * page) - transactionsCountPerPage)
    .sort({ date: -1 })
    .limit(transactionsCountPerPage);
  return res.status(200).json({ transactions, count });
}

updateTransaction = async (req, res) => {
  const userId = req.session.userId || req.body.api_key;
  if (!userId)
    return res.status(400).json({ error: "User is not logged in" });

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const body = req.body
  if (!body.id)
    return res.status(400).json({ error: "Transaction name is not defined" });

  Transaction.findOne({ user_id: userId, _id: body.id }, async function (err, result) {
    if (err || !result) {
      console.log(err);
      return res.status(400).json({ error: 'Transaction was not updated' });
    }

    result.title = body.title;
    result.amount = body.amount;
    result.date = body.date;
    result.type = body.type;
    result.categories = body.categories;

    await result.save();
    return res.status(200).json();
  });
}

deleteTransaction = (req, res) => {
  const userId = req.session.userId || req.query.api_key;
  if (!userId)
    return res.status(400).json({ error: "User is not logged in" });

  const query = req.query;
  if (!query._id)
    return res.status(400).json({ error: "Id is not defined" });

  Transaction.findOneAndDelete({ _id: query._id, user_id: userId },
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
