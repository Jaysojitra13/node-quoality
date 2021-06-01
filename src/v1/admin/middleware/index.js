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
      return res.status(404).send({ message: global.l10n.t('ADMIN_NOT_FOUND') });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

userMiddleware.checkGuestExist = async (req, res, next) => {
  try {
    const guest = await UserModel.findOne({ email: req.body.email });
    if (guest) {
      return res.status(400).send({ message: global.l10n.t('GUEST_EXIST') });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};
module.exports = userMiddleware;
