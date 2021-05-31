const express = require('express');
// const validator = require('express-joi-validation').createValidator({});
const {
  registerAdmin, login,
} = require('../controllers/index');
const { checkAdminExist } = require('../middleware/index');

const adminRoute = express.Router();

// adminRoute.get('/hotel', getHotel);

adminRoute.post('/register', registerAdmin);

adminRoute.post('/login', checkAdminExist, login);

// adminRoute.put('/hotel/:id', checkHotelExist, updateHotelDetail);

// adminRoute.delete('/hotel/:id', checkHotelExist, deleteHotel);

module.exports = adminRoute;
