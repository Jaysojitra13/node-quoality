const {
  createHotelServiceUtil, getHotelServiceUtil, updateHotelServiceDetail, deleteHotelService,
} = require('../utils/index');

const hotelServiceController = {};

hotelServiceController.createHotelService = async (req, res) => {
  try {
    const hotel = await createHotelServiceUtil(req.body);
    return res.status(200).send({ message: 'Hotel Service created successfully.', data: hotel });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

hotelServiceController.getHotelService = async (req, res) => {
  try {
    const hotelList = await getHotelServiceUtil();
    return res.status(200).send({ message: 'Hotel Service list get successfully', data: hotelList });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

hotelServiceController.getHotelServiceDetail = async (req, res) => {
  try {
    const hotelDetail = req.hotelService;
    return res.status(200).send({ message: 'Hotel Service detail get successfully', data: hotelDetail });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

hotelServiceController.updateHotelServiceDetail = async (req, res) => {
  try {
    console.log(req.params.id, req.body);

    const hotelDetail = await updateHotelServiceDetail(req.params.id, req.body);
    return res.status(200).send({ message: 'Hotel Service detail updated successfully', data: hotelDetail });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

hotelServiceController.deleteHotelService = async (req, res) => {
  try {
    await deleteHotelService(req.params.id);
    return res.status(200).send({ message: 'Hotel Service deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};
module.exports = hotelServiceController;
