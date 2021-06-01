const {
  createHotelServiceUtil, getHotelServiceUtil, updateHotelServiceDetail, deleteHotelService,
} = require('../utils/index');

const hotelServiceController = {};

hotelServiceController.createHotelService = async (req, res) => {
  try {
    const hotel = await createHotelServiceUtil(req.body);
    return res.status(200).send({ message: global.l10n.t('HOTEL_SERVICE_CREATED'), data: hotel });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

hotelServiceController.getHotelService = async (req, res) => {
  try {
    const hotelList = await getHotelServiceUtil(req.query.hotelId);
    return res.status(200).send({ message: global.l10n.t('HOTEL_SERIVCE_LIST'), data: hotelList });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

hotelServiceController.getHotelServiceDetail = async (req, res) => {
  try {
    const hotelDetail = req.hotelService;
    return res.status(200).send({ message: global.l10n.t('HOTEL_SERIVCE_GET_DETAIL'), data: hotelDetail });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

hotelServiceController.updateHotelServiceDetail = async (req, res) => {
  try {
    const hotelDetail = await updateHotelServiceDetail(req.params.id, req.body);
    return res.status(200).send({ message: 'HOTEL_SERIVCE_UPDATE', data: hotelDetail });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

hotelServiceController.deleteHotelService = async (req, res) => {
  try {
    await deleteHotelService(req.params.id);
    return res.status(200).send({ message: global.l10n.t('HOTEL_SERIVCE_DELETE') });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};
module.exports = hotelServiceController;
