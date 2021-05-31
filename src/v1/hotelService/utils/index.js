/* eslint-disable no-useless-catch */
/* eslint-disable max-len */
const HotelServiceModel = require('../../../models/hotelService.model');

const hotelServiceUtil = {};

hotelServiceUtil.createHotelServiceUtil = async (body) => {
  try {
    const hotelObj = new HotelServiceModel(body);
    const resposne = await hotelObj.save();
    return resposne;
  } catch (error) {
    throw error;
  }
};

hotelServiceUtil.getHotelServiceUtil = async (id) => {
  try {
    const condition = {};
    if (id) {
      condition.hotelId = id;
    }
    const hotelList = await HotelServiceModel.find(condition).populate('hotelId', '_id name');
    return hotelList;
  } catch (error) {
    throw error;
  }
};

hotelServiceUtil.updateHotelServiceDetail = async (id, obj) => {
  try {
    const hotelDetail = await HotelServiceModel.findOneAndUpdate({ _id: id }, { $set: obj }, { new: true });
    return hotelDetail;
  } catch (error) {
    throw error;
  }
};

hotelServiceUtil.deleteHotelService = async (id) => {
  try {
    await HotelServiceModel.deleteOne({ _id: id });
    return true;
  } catch (error) {
    throw error;
  }
};
module.exports = hotelServiceUtil;
