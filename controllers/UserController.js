const User = require('../models/User');
const bcrypt = require('bcrypt');

checkUser = (req, res) => {
    const body = req.body;

    if (!body)
        return res.status(400).json({ error: "You must provide a user" });

    if (!body.user.username && !body.user.password)
        return res.status(200).json({ error: "Inputs are empty" });

    User.findOne({ username: body.user.username }, (err, user) => {
        if (err || !user)
            return res.status(200).json({ error: "User not found" });

        bcrypt.compare(body.user.password, user.password, function (err, result) {
            if (result)
                return res.status(200).json({ success: true, data: user });
            return res.status(200).json({ error: "Invalid password" });
        });
    });
}

createUser = (req, res) => {
    const body = req.body;

    if (!body)
        return res.status(400).json({ error: "You must provide a user" });

    if (!body.user.username && !body.user.password)
        return res.status(200).json({ error: "Inputs are empty" });

    const hash = bcrypt.hashSync(body.user.password, 10);

    User.create({ username: body.user.username, password: hash }, (err, user) => {
        if (err)
            return res.status(400).json({ error, message: 'User not created' });
        return res.status(200).json({ success: true, id: user._id, message: 'User created' });
    });
}

module.exports = {
    checkUser,
    createUser
}
