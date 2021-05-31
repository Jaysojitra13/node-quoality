const HotelServiceModel = require('../../../models/hotelService.model');

const hotelServiceUtil = {};

hotelServiceUtil.createHotelServiceUtil = async (body) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Create hotel
    const hotelObj = new HotelServiceModel(body);
    const resposne = await hotelObj.save();
    return resposne;
  } catch (error) {
    throw error;
  }
};

hotelServiceUtil.getHotelServiceUtil = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Create hotel
    const hotelList = await HotelServiceModel.find();
    return hotelList;
  } catch (error) {
    throw error;
  }
};

hotelServiceUtil.updateHotelServiceDetail = async (id, obj) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Create hotel
    // eslint-disable-next-line max-len
    const hotelDetail = await HotelServiceModel.findOneAndUpdate({ _id: id }, { $set: obj }, { new: true });
    return hotelDetail;
  } catch (error) {
    throw error;
  }
};

hotelServiceUtil.deleteHotelService = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Create hotel
    await HotelServiceModel.deleteOne({ _id: id });
    return true;
  } catch (error) {
    throw error;
  }
};
module.exports = hotelServiceUtil;
