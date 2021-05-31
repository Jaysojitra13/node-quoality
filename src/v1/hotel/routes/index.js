const express = require('express');
const validator = require('express-joi-validation').createValidator({});
const {
  createHotel, getHotel, getHotelDetail, updateHotelDetail, deleteHotel,
} = require('../controllers/index');
const { createBodyValidationSchema, checkHotelExist } = require('../middleware/index');
const { checkToken } = require('../../../commonUtils/jwtValidation');

const hotelRoute = express.Router();

hotelRoute.get('/hotel', getHotel);

hotelRoute.post('/hotel', checkToken, validator.body(createBodyValidationSchema), createHotel);

hotelRoute.get('/hotel/:id', checkHotelExist, getHotelDetail);

hotelRoute.put('/hotel/:id', checkHotelExist, updateHotelDetail);

hotelRoute.delete('/hotel/:id', checkHotelExist, deleteHotel);

module.exports = hotelRoute;
