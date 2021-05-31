/* eslint-disable consistent-return */
const Joi = require('joi');
const UserModel = require('../../../models/user.model');

const userMiddleware = {};

userMiddleware.registerAdminBody = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

userMiddleware.loginBody = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

userMiddleware.addGuestBody = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  role: Joi.string().required(),
});

userMiddleware.checkAdminExist = async (req, res, next) => {
  try {
    const admin = await UserModel.findOne({ email: req.body.email });
    if (admin) {
      req.admin = JSON.parse(JSON.stringify(admin));
      next();
    } else {
      return res.status(404).send({ message: 'Admin not found' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

userMiddleware.checkGuestExist = async (req, res, next) => {
  try {
    const guest = await UserModel.findOne({ email: req.body.email });
    if (guest) {
      return res.status(400).send({ message: 'Guest already exist with this email id' });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};
module.exports = userMiddleware;
