const express = require('express');
const validator = require('express-joi-validation').createValidator({});
const {
  registerAdmin, login, addGuest,
} = require('../controllers/index');
const {
  checkAdminExist, registerAdminBody, loginBody, addGuestBody, checkGuestExist,
} = require('../middleware/index');
const { checkToken } = require('../../../commonUtils/jwtValidation');

const adminRoute = express.Router();

adminRoute.post('/register', validator.body(registerAdminBody), registerAdmin);

adminRoute.post('/login', validator.body(loginBody), checkAdminExist, login);

adminRoute.post('/add-guest', validator.body(addGuestBody), checkToken, checkGuestExist, addGuest);

module.exports = adminRoute;
