const Budget = require('../models/Budget');
const { validationResult } = require('express-validator');

getUserBudgets = (req, res) => {
  const userId = req.session.userId || req.query.api_key;
  if (!userId)
    return res.status(400).json({ error: "User is not logged in" });

  Budget.find({ user_id: userId }, (err, budgets) => {
    if (err || !budgets)
      return res.status(200).json({ error: "User has not any budgets" });

    return res.status(200).json({ budgets });
  });
}

createBudget = (req, res) => {

  const userId = req.session.userId || req.query.api_key;
  if (!userId)
    return res.status(400).json({ error: "User is not logged in" });

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const body = req.body;
  Budget.create({
    user_id: userId,
    name: body.name,
    from: body.from,
    to: body.to,
    goal_amount: body.amount,
  }, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Budget was not created' });
    }
    return res.status(200).json();
  });
}

deleteBudget = (req, res) => {
  const userId = req.session.userId || req.query.api_key;
  if (!userId)
    return res.status(400).json({ error: "User is not logged in" });

  const query = req.query;
  if (!query.name)
    return res.status(400).json({ error: "Budget name is not defined" });

  Budget.findOneAndDelete({ user_id: userId, name: query.name }, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Budget was not deleted' });
    }
    return res.status(200).json();

  })
}

updateBudget = (req, res) => {

  const userId = req.session.userId || req.query.api_key;
  if (!userId)
    return res.status(400).json({ error: "User is not logged in" });

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const body = req.body

  if (!body.oldName)
    return res.status(400).json({ error: "Budget name is not defined" });

  Budget.findOne({ user_id: userId, name: body.oldName }, async function (err, budgetDoc) {
    if (err || !budgetDoc) {
      console.log(err);
      return res.status(400).json({ error: 'Budget was not updated' });
    }

    if (body.name)
      budgetDoc.name = body.name;
    if (body.from)
      budgetDoc.from = body.from;
    if (body.to)
      budgetDoc.to = body.to;
    if (body.amount)
      budgetDoc.goal_amount = body.amount;
    await budgetDoc.save();
    return res.status(200).json();
  });
}

module.exports = {
  getUserBudgets,
  createBudget,
  deleteBudget,
  updateBudget
}
