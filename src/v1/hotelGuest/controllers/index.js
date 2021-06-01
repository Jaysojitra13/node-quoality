const {
  getGuestList, addGuest, getHotelList, getHotelGuests, udpateHotelGuest, deleteHotelGuest,
  getTotalGuestCount,
} = require('../utils/index');

const hotelGuestController = {};

hotelGuestController.getGuestList = async (req, res) => {
  try {
    const data = await getGuestList();
    return res.status(200).send({ message: global.l10n.t('GUEST_LIST'), data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

hotelGuestController.getHotelList = async (req, res) => {
  try {
    const data = await getHotelList();
    return res.status(200).send({ message: global.l10n.t('HOTEL_LIST'), data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

hotelGuestController.addGuest = async (req, res) => {
  try {
    const data = await addGuest(req.body);
    if (data) {
      return res.status(200).send({ message: global.l10n.t('GUEST_ADD'), data });
    }
    return res.status(200).send({ message: global.l10n.t('HOTEL_ALREADY_ASSIGN') });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

hotelGuestController.getHotelGuests = async (req, res) => {
  try {
    const data = await getHotelGuests(req.query);
    return res.status(200).send({ message: global.l10n.t('HOTEL_GUEST_LIST'), data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

hotelGuestController.udpateHotelGuest = async (req, res) => {
  try {
    const data = await udpateHotelGuest(req.params.id, req.body);
    return res.status(200).send({ message: global.l10n.t('HOTEL_GUEST_UPDATE'), data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

hotelGuestController.deleteHotelGuest = async (req, res) => {
  try {
    await deleteHotelGuest(req.params.id);
    return res.status(200).send({ message: global.l10n.t('HOTEL_GUEST_DELETE') });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

hotelGuestController.getTotalGuestCount = async (req, res) => {
  try {
    const data = await getTotalGuestCount();
    return res.status(200).send({ message: global.l10n.t('TOTAL_GUEST_COUNT'), totalGuest: data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};
module.exports = hotelGuestController;
