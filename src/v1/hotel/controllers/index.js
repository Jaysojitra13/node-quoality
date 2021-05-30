const {
  createHotelUtil, getHotelUtil, updateHotelDetail, deleteHotel,
} = require('../utils/index');

const hotelController = {};

hotelController.createHotel = async (req, res) => {
  try {
    const hotel = await createHotelUtil(req.body);
    return res.status(200).send({ message: 'Hotel created successfully.', data: hotel });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

hotelController.getHotel = async (req, res) => {
  try {
    const hotelList = await getHotelUtil();
    return res.status(200).send({ message: 'Hotel list get successfully', data: hotelList });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

hotelController.getHotelDetail = async (req, res) => {
  try {
    const hotelDetail = req.hotel;
    return res.status(200).send({ message: 'Hotel detail get successfully', data: hotelDetail });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

hotelController.updateHotelDetail = async (req, res) => {
  try {
    const hotelDetail = await updateHotelDetail(req.params.id, req.body);
    return res.status(200).send({ message: 'Hotel detail updated successfully', data: hotelDetail });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

hotelController.deleteHotel = async (req, res) => {
  try {
    await deleteHotel(req.params.id);
    return res.status(200).send({ message: 'Hotel deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};
module.exports = hotelController;
