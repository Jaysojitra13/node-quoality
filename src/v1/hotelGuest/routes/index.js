const express = require('express');
const validator = require('express-joi-validation').createValidator({});
const {
  getGuestList, addGuest, getHotelList, getHotelGuests, udpateHotelGuest, deleteHotelGuest,
} = require('../controllers/index');
const {
  checkGuestExist, checkHotelExist, addHotelGuest, checkHotelGuestExist, updateHotelGuest,
} = require('../middleware/index');
const { checkToken } = require('../../../commonUtils/jwtValidation');

const hotelGuest = express.Router();

hotelGuest.get('/guest-list', checkToken, getGuestList);

hotelGuest.get('/hotel-list', checkToken, getHotelList);

hotelGuest.post('/', checkToken, validator.body(addHotelGuest), checkHotelExist, checkGuestExist, addGuest);

hotelGuest.get('/', checkToken, getHotelGuests);

hotelGuest.put('/:id', checkToken, validator.body(updateHotelGuest), checkHotelGuestExist, udpateHotelGuest);

hotelGuest.delete('/:id', checkToken, checkHotelGuestExist, deleteHotelGuest);

module.exports = hotelGuest;
