/* eslint-disable no-useless-catch */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const bcrypt = require('bcrypt');
const UserModel = require('../../../models/user.model');
const { generateToken } = require('../../../commonUtils/jwtValidation');

const adminlUtil = {};

adminlUtil.createAdmin = async (body) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const password = await bcrypt.hash(body.password, salt);

    body.password = password;
    const adminObj = new UserModel(body);
    const resposne = await adminObj.save();
    return resposne;
  } catch (error) {
    throw error;
  }
};

adminlUtil.login = async (body, user) => {
  try {
    const checkPassword = await bcrypt.compare(body.password, user.password);

    if (checkPassword) {
      const tokenData = {
        uid: user._id,
        email: user.email,
      };
      const token = await generateToken(tokenData);
      delete user.password;
      const response = {
        ...user,
        token,
      };
      return response;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

adminlUtil.addGuest = async (body) => {
  try {
    delete body.password;
    const guestObj = new UserModel(body);
    const resposne = await guestObj.save();
    return resposne;
  } catch (error) {
    throw error;
  }
};
module.exports = adminlUtil;
