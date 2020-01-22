const User = require('../models/User');
const bcrypt = require('bcrypt');

checkUser = (req, res) => {
  const body = req.body;

  if (!body)
    return res.status(400).json({ error: "You must provide a user" });

  if (!body.user.username || !body.user.password)
    return res.status(422).json({ error: "Inputs are empty" });

  User.findOne({ username: body.user.username }, (err, user) => {
    if (err || !user)
      return res.status(422).json({ error: "User not found" });

    bcrypt.compare(body.user.password, user.password, function (err, result) {
      if (err)
        return res.status(422).json({ error: "Invalid password" });

      req.session.userId = user._id;
      return res.status(200).json({ api_key: user._id });
    });
  });
}

createUser = (req, res) => {
  const body = req.body;

  if (!body)
    return res.status(400).json({ error: "You must provide a user" });

  if (!body.user.username || !body.user.password)
    return res.status(422).json({ error: "Inputs are empty" });

  User.create({ username: body.user.username, password: body.user.password }, (err, user) => {
    if (err)
      return res.status(422).json({ error: 'User not created' });

    req.session.userId = user._id;
    return res.status(200).json({ api_key: user._id });
  });
}

module.exports = {
  checkUser,
  createUser
}
