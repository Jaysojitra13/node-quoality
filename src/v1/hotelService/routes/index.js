const express = require('express');
const validator = require('express-joi-validation').createValidator({});
const {
  // eslint-disable-next-line max-len
  createHotelService, getHotelService, getHotelServiceDetail, updateHotelServiceDetail, deleteHotelService,
} = require('../controllers/index');
const { createBodyValidationSchema, checkHotelExist, checkHotelServiceExist } = require('../middlewares/index');

const hotelServiceRoute = express.Router();

hotelServiceRoute.get('/hotel-service', getHotelService);

hotelServiceRoute.post('/hotel-service', validator.body(createBodyValidationSchema), checkHotelExist, createHotelService);

hotelServiceRoute.get('/hotel-service/:id', checkHotelServiceExist, getHotelServiceDetail);

hotelServiceRoute.put('/hotel-service/:id', checkHotelExist, checkHotelServiceExist, updateHotelServiceDetail);

hotelServiceRoute.delete('/hotel-service/:id', checkHotelServiceExist, deleteHotelService);

module.exports = hotelServiceRoute;
