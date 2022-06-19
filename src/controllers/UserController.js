const bcryptjs = require('bcryptjs');

const UserModel = require('../models/UserModel');
const Logger = require('../plugins/logger');

const UserController = {
  create: async (req, res) => {
    const {name, email, password} = req.body;
    if (!name) {
      Logger.debug('name is required');
      return res.status(400).json({error: 'name is required'});
    }
    if (!email) {
      Logger.debug('email is required');
      return res.status(400).json({error: 'email is required'});
    }
    if (!password) {
      Logger.debug('password is required');
      return res.status(400).json({error: 'password is required'});
    }

    const emailAlreadyExists = await UserModel.findOne({email});
    if (emailAlreadyExists) {
      Logger.debug('Email already exists');
      return res.status(400).json({error: 'Email already exists'});
    }

    try {
      const userPointer = await UserModel.create({
        name,
        email,
        password,
      });
      return res.status(200).json({id: userPointer._id});
    } catch (err) {
      Logger.error(`Error when creating user: ${err}` );
      return res.status(500).json({error: 'User save failed'});
    }
  },
  authenticate: async (req, res) => {
    const {email, password} = req.body;
    if (!email) {
      Logger.debug('email is required');
      return res.status(400).json({error: 'email is required'});
    }
    if (!password) {
      Logger.debug('password is required');
      return res.status(400).json({error: 'password received'});
    }

    try {
      const user = await UserModel.findOne({email});
      if (!user) {
        Logger.debug(`User not found, searching: ${email}`);
        return res.status(404).json({error: 'Email or password incorrect'});
      }
      if (!(await bcryptjs.compare(password, user.password))) {
        Logger.debug(`Wrong password trying to authenticate in user ${email}`);
        return res.status(401).json({error: 'Email or password incorrect'});
      }
      // TO-DO: Generate token
      return res.status(200).json({id: user._id});
    } catch (err) {
      Logger.error(`Error when authenticating user: ${err}` );
      return res.status(500).json({error: 'User authentication failed'});
    }
  },
};

module.exports = UserController;
