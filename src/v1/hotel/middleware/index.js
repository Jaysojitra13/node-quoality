const Joi = require('joi');
const HotelModel = require('../../../models/hotel.model');

const hotelMiddleware = {};

hotelMiddleware.createBodyValidationSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  totalRooms: Joi.string().required(),
  contactNumber: Joi.string().required(),
});

// eslint-disable-next-line consistent-return
hotelMiddleware.checkHotelExist = async (req, res, next) => {
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
module.exports = hotelMiddleware;
