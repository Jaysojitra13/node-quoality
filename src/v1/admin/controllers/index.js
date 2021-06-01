const {
  createAdmin, login, addGuest,
} = require('../utils/index');

const adminController = {};

adminController.registerAdmin = async (req, res) => {
  try {
    const admin = await createAdmin(req.body);
    return res.status(200).send({ message: global.l10n.t('ADMIN_CREATE'), data: admin });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

adminController.login = async (req, res) => {
  try {
    const admin = await login(req.body, req.admin);
    if (admin) {
      return res.status(200).send({ message: global.l10n.t('ADMIN_LOGIN'), data: admin });
    }
    return res.status(400).send({ message: global.l10n.t('INVALID_PASSWORD') });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

adminController.addGuest = async (req, res) => {
  try {
    const guest = await addGuest(req.body);
    return res.status(200).send({ message: global.l10n.t('GUEST_CREATE'), data: guest });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: global.l10n.t('SOMETHING_WENT_WRONG') });
  }
};

module.exports = adminController;
