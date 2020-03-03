const Category = require('../models/Category');

createCategory = (req, res) => {
  const userId = req.session.userId || req.query.api_key;
  if (!userId)
    return res.status(400).json({ error: "User is not logged in" });

  const body = req.body;
  Category.create({
    user_id: userId,
    type: body.type,
    color: body.color,
    background: body.background
  }, (err) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ message: 'Category was not created' });
    }
    return res.status(200).json({});
  });
}

getAllCategories = async (req, res) => {
  const userId = req.session.userId || req.query.api_key;
  if (!userId)
    return res.status(400).json({ error: "User is not logged in" });

  categories = await Category.find({ user_id: userId });
  return res.status(200).json({ categories });
}

deleteCategory = (req, res) => {
  const userId = req.session.userId || req.query.api_key;
  if (!userId)
    return res.status(400).json({ error: "User is not logged in" });

  const query = req.query;
  if (!query.type)
    return res.status(400).json({ error: "Category type is not defined" });

  Category.findOneAndDelete({ user_id: userId, type: query.type }, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Category was not deleted' });
    }
    return res.status(200).json();

  })
}

updateCategory = (req, res) => {
  const userId = req.session.userId || req.query.api_key;
  if (!userId)
    return res.status(400).json({ error: "User is not logged in" });

  const body = req.body
  if (!body.oldType)
    return res.status(400).json({ error: "Category type is not defined" });

  Category.findOne({ user_id: userId, type: body.oldType }, async function (err, doc) {
    if (err || !doc) {
      console.log(err);
      return res.status(400).json({ error: 'Category was not updated' });
    }

    doc.type = body.type;
    doc.color = body.color;
    doc.background = body.background;
    await doc.save();
    return res.status(200).json();
  });
}

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
}
