const Transaction = require('../models/Transaction');

getAnalytics = async (req, res) => {
	const userId = req.session.userId || req.query.api_key;

	if (!userId)
		return res.status(400).json({ error: "User is not logged in" });

	const month = parseInt(req.query.month);

	await Transaction.aggregate([{
		$facet: {
			"monthlyExpenses": [
				{ $match: { $and: [{ user_id: userId }, { type: { $in: ["expense"] } }, { month: { $in: [month] } }] } },
				{ $group: { _id: null, sum: { $sum: "$amount" } } }],
			"monthlyIncomes": [
				{ $match: { $and: [{ user_id: userId }, { type: { $in: ["income"] } }, { month: { $in: [month] } }] } },
				{ $group: { _id: null, sum: { $sum: "$amount" } } }],
			"transactionsCurrentMonth": [
				{ $match: { $and: [{ user_id: userId }, { type: { $in: ["expense"] } }, { month: { $in: [month] } }] } },
				{ $sort: { day: 1 } }]
		}
	}], (err, result) => {
		if (err)
			return res.status(400).json({ error: err });

		let monthlyExpenses = 0;
		if (result[0].monthlyExpenses && result[0].monthlyExpenses.length) 
			monthlyExpenses = result[0].monthlyExpenses[0].sum;

		let monthlyIncomes = 0;
		if (result[0].monthlyIncomes && result[0].monthlyIncomes.length)
			monthlyIncomes = result[0].monthlyIncomes[0].sum;

		return res.status(200).json({ 
			monthlyExpenses: monthlyExpenses, 
			monthlyIncomes: monthlyIncomes, 
			transactionsCurrentMonth: result[0].transactionsCurrentMonth 
		});
	});
}

module.exports = {
	getAnalytics
}