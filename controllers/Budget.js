const Budget = require('../models/Budget');

getUserBudgets = (req, res) => {
  if (!req.session.userId)
    return res.status(400).json({ error: "You must be logged in" });

  const body = req.body;
  if (!body && !body.user.id)
    return res.status(400).json({ error: "You must provide a user" });

  Budget.find({ user_id: req.session.userId }, (err, budgets) => {
    if (err || !budgets)
      return res.status(200).json({ error: "User has not any budgets" });

    return res.status(200).json({ data: budgets });
  });
}

createBudget = (req, res) => {
  if (!req.session.userId)
  return res.status(400).json({ error: "You must be logged in" });

  const body = req.body;
  if (!body)
    return res.status(400).json({ error: "You must provide a user" });
}

module.exports = {
  getUserBudgets,
  createBudget
}
