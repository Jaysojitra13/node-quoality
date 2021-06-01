const {
  createHotelUtil, getHotelUtil, updateHotelDetail, deleteHotel,
} = require('../utils/index');

const hotelController = {};

hotelController.createHotel = async (req, res) => {
  try {
    const hotel = await createHotelUtil(req.body);
    return res.status(200).send({ message: global.l10n.t('HOTEL_CREATE'), data: hotel });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

hotelController.getHotel = async (req, res) => {
  try {
    const hotelList = await getHotelUtil();
    return res.status(200).send({ message: global.l10n.t('HOTEL_LIST'), data: hotelList });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

hotelController.getHotelDetail = async (req, res) => {
  try {
    const hotelDetail = req.hotel;
    return res.status(200).send({ message: global.l10n.t('HOTEL_DETAIL'), data: hotelDetail });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

hotelController.updateHotelDetail = async (req, res) => {
  try {
    const hotelDetail = await updateHotelDetail(req.params.id, req.body);
    return res.status(200).send({ message: global.l10n.t('HOTEL_UPDATE'), data: hotelDetail });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

hotelController.deleteHotel = async (req, res) => {
  try {
    await deleteHotel(req.params.id);
    return res.status(200).send({ message: global.l10n.t('HOTEL_DELETE') });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};
module.exports = hotelController;
