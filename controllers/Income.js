const Income = require('../models/Income');

  createIncome = (req, res) => {
    const body = req.body;
    console.log(body.income);
    Income.create({
        count: body.income.count,
        year: body.income.year,
        month: body.income.month,
        day: body.income.day
    }, (err) => {
      if (err)
        return res.status(400).json({ message: 'Income not created' });
      return res.status(200).json({ success: true, message: 'Income created' });
    });
  }

  getAllIncomes = async (req, res) => {
    incomes = await Income.find({});
    return res.status(200).json({ success: true, message: '', result: incomes });
  }

  module.exports = {
    createIncome,
    getAllIncomes
  }
