const { check } = require('express-validator');

budgetValidation = () => {
  return [
    check('name').notEmpty().trim().escape().withMessage('Budget name is empty'),
    check('name').isLength({ min: 2, max: 50 }).withMessage('Budget name length min: 2; max: 50'),

    check('from').notEmpty().withMessage('Date [from] is empty'),
    check('from').isISO8601().toDate().withMessage('Date [from] is not a valid'),

    check('to').notEmpty().withMessage('Date [to] is empty'),
    check('to').isISO8601().toDate().withMessage('Date [to] is not a valid'),

    check('amount').isFloat().withMessage('Goal budget amount is not numeric'),
    check('amount').notEmpty().withMessage('Goal budget amount is empty'),
  ]
}

transactionValidation = () => {
  return [
    check('title').notEmpty().trim().escape().withMessage('Transaction title is empty'),
    check('title').isLength({ min: 2, max: 50 }).withMessage('Transaction title length min: 2; max: 50'),

    check('amount').isFloat().withMessage('Goal transaction amount is not numeric'),
    check('amount').notEmpty().withMessage('Goal transaction amount is empty'),

    check('category').notEmpty().trim().escape().withMessage('Select a category'),
  ]
}

module.exports = {
  budgetValidation,
  transactionValidation
}
