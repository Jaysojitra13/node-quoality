/* eslint-disable no-useless-catch */
/* eslint-disable no-empty */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const UserModel = require('../../../models/user.model');
const HotelGuestModel = require('../../../models/hotelGuest.model');
const HotelModel = require('../../../models/hotel.model');

const hotelGuestUtil = {};

hotelGuestUtil.getGuestList = async () => {
  try {
    const resposne = await UserModel.find({ role: 'guest', status: true }, { _id: 1, name: 1 });
    return resposne;
  } catch (error) {
    throw error;
  }
};

hotelGuestUtil.addGuest = async (data) => {
  try {
    const clonedDate = data.bookedDate;
    const startDate = new Date(new Date(data.bookedDate).setHours(0, 0, 0, 0));
    const endDate = new Date(new Date(clonedDate).setHours(23, 59, 59, 59));

    const checkExist = await HotelGuestModel.findOne({
      userId: data.userId,
      hotelId: data.hotelId,
      $and: [
        {
          bookedDate: { $gte: startDate },
        },
        {
          bookedDate: { $lte: endDate },
        },
      ],
    });
    if (checkExist) {
      return false;
    }
    const obj = new HotelGuestModel(data);
    const response = await obj.save();
    return response;
  } catch (error) {
    throw error;
  }
};

hotelGuestUtil.getHotelList = async () => {
  try {
    const resposne = await HotelModel.find({ status: true }, { _id: 1, name: 1 });
    return resposne;
  } catch (error) {
    throw error;
  }
};

hotelGuestUtil.getHotelGuests = async (filter) => {
  try {
    const condition = {};
    if (filter && filter.hotelId) {
      condition.hotelId = filter.hotelId;
    }
    const response = await HotelGuestModel.find(condition).populate('userId', '_id name email').populate('hotelId', '_id name');
    return response;
  } catch (error) {
    throw error;
  }
};

hotelGuestUtil.udpateHotelGuest = async (id, body) => {
  try {
    const response = await HotelGuestModel.findOneAndUpdate({ _id: id }, { $set: body }, { new: true });
    return response;
  } catch (error) {
    throw error;
  }
};

hotelGuestUtil.deleteHotelGuest = async (id) => {
  try {
    const response = await HotelGuestModel.deleteOne({ _id: id });
    return response;
  } catch (error) {
    throw error;
  }
};
module.exports = hotelGuestUtil;
