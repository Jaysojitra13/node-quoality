const express = require('express');
const validator = require('express-joi-validation').createValidator({});
const {
  createHotel, getHotel, getHotelDetail, updateHotelDetail, deleteHotel,
} = require('../controllers/index');
const { createBodyValidationSchema, checkHotelExist, checkParentHotelExist } = require('../middleware/index');
const { checkToken } = require('../../../commonUtils/jwtValidation');

const hotelRoute = express.Router();

hotelRoute.get('/hotel', checkToken, getHotel);

hotelRoute.post('/hotel', checkToken, validator.body(createBodyValidationSchema), checkParentHotelExist, createHotel);

hotelRoute.get('/hotel/:id', checkToken, checkHotelExist, getHotelDetail);

hotelRoute.put('/hotel/:id', checkToken, checkHotelExist, updateHotelDetail);

hotelRoute.delete('/hotel/:id', checkToken, checkHotelExist, deleteHotel);

module.exports = hotelRoute;
