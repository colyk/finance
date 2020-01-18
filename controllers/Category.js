const Category = require('../models/Category');

createCategory = (req, res) => {
  if (!req.session.userId)
    return res.status(400).json({ error: "User is not logged in" });

  const body = req.body;
  console.log(body);
  Category.create({
    user_id: req.session.userId,
    type: body.type,
    color: body.color,
  }, (err) => {
    if (err){console.log(err)
      return res.status(400).json({ message: 'Category was not created' });}
    return res.status(200).json({});
  });
}

getAllCategories = async (req, res) => {
  if (!req.session.userId)
    return res.status(400).json({ error: "User is not logged in" });

  categories = await Category.find({ user_id: req.session.userId });
  return res.status(200).json({ categories });
}

module.exports = {
  createCategory,
  getAllCategories
}
