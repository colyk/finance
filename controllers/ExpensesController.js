const Expense = require('../models/Expense');

createExpense = (req, res) => {
    const body = req.body;
    console.log(body.expense);
    Expense.create({ 
        count: body.expense.count, 
        category: body.expense.category,
        year: body.expense.year, 
        month: body.expense.month, 
        day: body.expense.day,
        monthDay: body.expense.monthDay
    }, (err) => {
        if (err)
            return res.status(400).json({ message: 'Expense not created' });
        return res.status(200).json({ success: true, message: 'Expense created' });
    });
}

module.exports = {
    createExpense
}