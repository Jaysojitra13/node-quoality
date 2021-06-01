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
      return res.status(404).send({ message: global.l10n.t('HOTEL_NOT_FOUND') });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

// eslint-disable-next-line consistent-return
hotelServiceMiddleware.checkHotelServiceExist = async (req, res, next) => {
  try {
    let hotelSerivceId = req.params.id ? req.params.id : req.query.id;

    if (req.body.hotelSerivceId) {
      hotelSerivceId = req.body.hotelSerivceId;
    }

    const hotelServiceData = await HotelServiceModel.findOne({ _id: hotelSerivceId }).populate('hotelId', '_id name');
    if (hotelServiceData) {
      req.hotelService = hotelServiceData;
      next();
    } else {
      return res.status(404).send({ message: global.l10n.t('HOTEL_SERVICE_NOT_FOUND') });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};
module.exports = hotelServiceMiddleware;
