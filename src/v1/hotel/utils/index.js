/* eslint-disable no-useless-catch */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const HotelModel = require('../../../models/hotel.model');

const hotelUtil = {};

hotelUtil.createHotelUtil = async (body) => {
  try {
    const hotelObj = new HotelModel(body);
    const resposne = await hotelObj.save();
    return resposne;
  } catch (error) {
    throw error;
  }
};

hotelUtil.getHotelUtil = async () => {
  try {
    let hotelList = await HotelModel.find({ parentHotelId: { $exists: false } });
    hotelList = JSON.parse(JSON.stringify(hotelList));

    for (const hotel of hotelList) {
      hotel.branches = await HotelModel.find({ parentHotelId: hotel._id });
    }
    return hotelList;
  } catch (error) {
    throw error;
  }
};

hotelUtil.updateHotelDetail = async (id, obj) => {
  try {
    const hotelDetail = await HotelModel.findOneAndUpdate({ _id: id }, { $set: obj });
    return hotelDetail;
  } catch (error) {
    throw error;
  }
};

hotelUtil.deleteHotel = async (id) => {
  try {
    await HotelModel.deleteOne({ _id: id });
    await HotelModel.deleteMany({ parentHotelId: id });
    return true;
  } catch (error) {
    throw error;
  }
};
module.exports = hotelUtil;
