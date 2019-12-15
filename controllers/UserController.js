const User = require('../models/User');
const bcrypt = require('bcrypt');

checkUser = (req, res) => {
    const body = req.body;

    if (body) {
        if (body.user.username !== '' && body.user.password !== '') {
            User.findOne({ username: body.user.username }, (err, user) => {
                if (err) return res.status(400).json({ success: false, error: err });
                if (user !== null) {
                    bcrypt.compare(body.user.password, user.password, function (err, result) {
                        if (result) return res.status(200).json({ success: true, data: user });
                        else return res.status(200).json({ success: false, error: "Invalid password" });
                    });
                } else return res.status(200).json({ success: false, error: "User not found" });
            });
        } else return res.status(200).json({ success: false, error: "Inputs are empty" });
    } else return res.status(200).json({ success: false, error: "Error send data" });
}

module.exports = {
    checkUser
}