const { check } = require('express-validator');

budgetValidation = (param) => {
  switch (param) {
    case "post_budget": {
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
    case "put_budget": {
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
  }
}

module.exports = {
  budgetValidation
}
