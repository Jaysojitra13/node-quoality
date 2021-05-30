const HotelModel = require('../../../models/hotel.model');

const hotelUtil = {};

hotelUtil.createHotelUtil = async (body) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Create hotel
    const hotelObj = new HotelModel(body);
    const resposne = await hotelObj.save();
    return resposne;
  } catch (error) {
    throw error;
  }
};

hotelUtil.getHotelUtil = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Create hotel
    const hotelList = await HotelModel.find();
    return hotelList;
  } catch (error) {
    throw error;
  }
};

hotelUtil.updateHotelDetail = async (id, obj) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Create hotel
    const hotelDetail = await HotelModel.findOneAndUpdate({ _id: id }, { $set: obj });
    return hotelDetail;
  } catch (error) {
    throw error;
  }
};

hotelUtil.deleteHotel = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Create hotel
    await HotelModel.deleteOne({ _id: id });
    return true;
  } catch (error) {
    throw error;
  }
};
module.exports = hotelUtil;
