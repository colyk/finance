const Category = require('../models/Category');

createCategory = (req, res) => {
  const body = req.body;
  console.log(body.category);
  Category.create({
    name: body.category.name,
    number: body.category.number,
  }, (err) => {
    if (err)
      return res.status(400).json({ message: 'Category not created' });
    return res.status(200).json({ success: true, message: 'Category created' });
  });
}

getAllCategories = async (req, res) => {
  categories = await Category.find({});
  return res.status(200).json({ success: true, message: '', result: categories });
}

module.exports = {
  createCategory,
  getAllCategories
}
