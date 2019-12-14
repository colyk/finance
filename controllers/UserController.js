const User = require('../models/User');

const UserController = {
  async index(req, res){
    const users = await User
       .find()
       .populate('users');
    res.send(users);
  }
};
module.exports = UserController;