const {
  getGuestList, addGuest, getHotelList, getHotelGuests, udpateHotelGuest, deleteHotelGuest,
} = require('../utils/index');

const hotelGuestController = {};

hotelGuestController.getGuestList = async (req, res) => {
  try {
    const data = await getGuestList();
    return res.status(200).send({ message: 'Guest list get successfully.', data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

hotelGuestController.getHotelList = async (req, res) => {
  try {
    const data = await getHotelList();
    return res.status(200).send({ message: 'Hotel list get successfully.', data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

hotelGuestController.addGuest = async (req, res) => {
  try {
    const data = await addGuest(req.body);
    if (data) {
      return res.status(200).send({ message: 'Guest added successfully.', data });
    }
    return res.status(200).send({ message: 'Hotel is already booked for this guest on this date.' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

hotelGuestController.getHotelGuests = async (req, res) => {
  try {
    const data = await getHotelGuests(req.query);
    return res.status(200).send({ message: 'Hotel Guest list get successfully.', data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

hotelGuestController.udpateHotelGuest = async (req, res) => {
  try {
    const data = await udpateHotelGuest(req.params.id, req.body);
    return res.status(200).send({ message: 'Hotel Guest detail updated successfully.', data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

hotelGuestController.deleteHotelGuest = async (req, res) => {
  try {
    await deleteHotelGuest(req.params.id);
    return res.status(200).send({ message: 'Hotel Guest detail deleted successfully.' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};
module.exports = hotelGuestController;
