const Joi = require('joi');
const UserModel = require('../../../models/user.model');

const userMiddleware = {};

userMiddleware.createBodyValidationSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  totalRooms: Joi.string().required(),
  contactNumber: Joi.string().required(),
});

// eslint-disable-next-line consistent-return
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
module.exports = userMiddleware;
