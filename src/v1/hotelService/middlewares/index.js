const Joi = require('joi');
const HotelServiceModel = require('../../../models/hotelService.model');
const HotelModel = require('../../../models/hotel.model');

const hotelServiceMiddleware = {};

hotelServiceMiddleware.createBodyValidationSchema = Joi.object({
  name: Joi.string().required(),
  hotelId: Joi.string().required(),
});

// eslint-disable-next-line consistent-return
hotelServiceMiddleware.checkHotelExist = async (req, res, next) => {
  try {
    let hotelId = req.params.id ? req.params.id : req.query.id;

    if (req.body.hotelId) {
      hotelId = req.body.hotelId;
    }

    const hotelData = await HotelModel.findOne({ _id: hotelId });
    if (hotelData) {
      req.hotel = hotelData;
      next();
    } else {
      return res.status(404).send({ message: 'Hotel not found' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

// eslint-disable-next-line consistent-return
hotelServiceMiddleware.checkHotelServiceExist = async (req, res, next) => {
  try {
    let hotelSerivceId = req.params.id ? req.params.id : req.query.id;

    if (req.body.hotelSerivceId) {
      hotelSerivceId = req.body.hotelSerivceId;
    }

    const hotelServiceData = await HotelServiceModel.findOne({ _id: hotelSerivceId });
    if (hotelServiceData) {
      req.hotelService = hotelServiceData;
      next();
    } else {
      return res.status(404).send({ message: 'Hotel Service not found' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};
module.exports = hotelServiceMiddleware;
