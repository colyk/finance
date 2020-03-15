const Transaction = require('../models/Transaction');

getAnalytics = async (req, res) => {
	const userId = req.session.userId || req.query.api_key;

	if (!userId)
		return res.status(400).json({ error: "User is not logged in" });

	const from = parseInt(req.query.from);
	const to = parseInt(req.query.to);

	dateRange = { date: { $gte: new Date(from), $lte: new Date(to) } };
	await Transaction.aggregate([{
		$facet: {
			"monthlyExpenses": [
				{ $match: { $and: [{ user_id: userId }, { type: { $in: ["expense"] } }, dateRange] } },
				{ $group: { _id: null, sum: { $sum: "$amount" } } }],
			"monthlyIncomes": [
				{ $match: { $and: [{ user_id: userId }, { type: { $in: ["income"] } }, dateRange] } },
				{ $group: { _id: null, sum: { $sum: "$amount" } } }],
			"transactionsCurrentMonth": [
				{ $match: { $and: [{ user_id: userId }, { type: { $in: ["expense"] } }, dateRange] } }]
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