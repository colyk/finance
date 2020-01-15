const Budget = require('../models/Budget');

getUserBudgets = (req, res) => {
  if (!req.session.userId)
    return res.status(400).json({ error: "User is not logged in" });

  Budget.find({ user_id: req.session.userId }, (err, budgets) => {
    if (err || !budgets)
      return res.status(200).json({ error: "User has not any budgets" });

    return res.status(200).json({ budgets });
  });
}

createBudget = (req, res) => {
  if (!req.session.userId)
    return res.status(400).json({ error: "User is not logged in" });

  const body = req.body;
  Budget.create({
    user_id: req.session.userId,
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
  if (!req.session.userId)
    return res.status(400).json({ error: "User is not logged in" });

  const query = req.query;
  if (!query.name)
    return res.status(400).json({ error: "Budget name is not defined" });

  Budget.findOneAndDelete({ user_id: req.session.userId, name: query.name }, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Budget was not deleted' });
    }
    return res.status(200).json();

  })
}


updateBudget = (req, res) => {
  if (!req.session.userId)
    return res.status(400).json({ error: "User is not logged in" });

  const query = req.query;
  if (!query.name)
    return res.status(400).json({ error: "Budget name is not defined" });


}

module.exports = {
  getUserBudgets,
  createBudget,
  deleteBudget,
  updateBudget
}
