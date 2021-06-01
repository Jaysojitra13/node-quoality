/* eslint-disable consistent-return */
const Joi = require('joi');
const HotelModel = require('../../../models/hotel.model');

const hotelMiddleware = {};

hotelMiddleware.createBodyValidationSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  totalRooms: Joi.string().required(),
  contactNumber: Joi.string().required(),
  parentHotelId: Joi.string().optional(),
});

// eslint-disable-next-line consistent-return
hotelMiddleware.checkHotelExist = async (req, res, next) => {
  try {
    let hotelId = req.params.id ? req.params.id : req.query.id;

    if (req.body.hotelId) {
      hotelId = req.body.hotelId;
    }

    let hotelData = await HotelModel.findOne({ _id: hotelId }).populate('parentHotelId', '_id name address totalRooms');
    if (hotelData) {
      hotelData = JSON.parse(JSON.stringify(hotelData));
      hotelData.branches = await HotelModel.find({ parentHotelId: hotelId });
      req.hotel = hotelData;
      next();
    } else {
      return res.status(404).send({ message: global.l10n.t('HOTEL_NOT_FOUND') });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

hotelMiddleware.checkParentHotelExist = async (req, res, next) => {
  try {
    if (req.body.parentHotelId) {
      const hotelData = await HotelModel.findOne({ _id: req.body.parentHotelId });
      if (hotelData) {
        next();
      } else {
        return res.status(404).send({ message: global.l10n.t('PARENT_HOTEL_NOT_FOUND') });
      }
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

module.exports = hotelMiddleware;
