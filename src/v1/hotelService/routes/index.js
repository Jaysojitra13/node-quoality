const express = require('express');
const validator = require('express-joi-validation').createValidator({});
const {
  // eslint-disable-next-line max-len
  createHotelService, getHotelService, getHotelServiceDetail, updateHotelServiceDetail, deleteHotelService,
} = require('../controllers/index');
const { createBodyValidationSchema, checkHotelExist, checkHotelServiceExist } = require('../middlewares/index');
const { checkToken } = require('../../../commonUtils/jwtValidation');

const hotelServiceRoute = express.Router();

hotelServiceRoute.get('/hotel-service', checkToken, getHotelService);

hotelServiceRoute.post('/hotel-service', checkToken, validator.body(createBodyValidationSchema), checkHotelExist, createHotelService);

hotelServiceRoute.get('/hotel-service/:id', checkToken, checkHotelServiceExist, getHotelServiceDetail);

hotelServiceRoute.put('/hotel-service/:id', checkToken, checkHotelExist, checkHotelServiceExist, updateHotelServiceDetail);

hotelServiceRoute.delete('/hotel-service/:id', checkToken, checkHotelServiceExist, deleteHotelService);

module.exports = hotelServiceRoute;
