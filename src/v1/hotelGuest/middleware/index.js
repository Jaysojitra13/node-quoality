/* eslint-disable consistent-return */
const Joi = require('joi');
const UserModel = require('../../../models/user.model');
const HotelModel = require('../../../models/hotel.model');
const hotelGuestModel = require('../../../models/hotelGuest.model');

const hotelGuestMiddleware = {};

hotelGuestMiddleware.addHotelGuest = Joi.object({
  hotelId: Joi.string().required(),
  userId: Joi.string().required(),
  bookedDate: Joi.string().required(),
});

hotelGuestMiddleware.updateHotelGuest = Joi.object({
  hotelId: Joi.string().optional(),
  userId: Joi.string().optional(),
  bookedDate: Joi.string().optional(),
});

hotelGuestMiddleware.checkHotelExist = async (req, res, next) => {
  try {
    const hotelDate = await HotelModel.findOne({ _id: req.body.hotelId });
    if (!hotelDate) {
      return res.status(404).send({ message: 'hotel not found' });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

hotelGuestMiddleware.checkGuestExist = async (req, res, next) => {
  try {
    const guest = await UserModel.findOne({ _id: req.body.userId, role: 'guest' });
    if (!guest) {
      return res.status(404).send({ message: 'Guest not found' });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

hotelGuestMiddleware.checkHotelGuestExist = async (req, res, next) => {
  try {
    const data = await hotelGuestModel.findOne({ _id: req.params.id });
    if (!data) {
      return res.status(404).send({ message: 'Hotel Guest not found' });
    }
    req.hoteGuest = data;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};
module.exports = hotelGuestMiddleware;
