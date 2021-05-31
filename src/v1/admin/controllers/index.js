const {
  createAdmin, login,
} = require('../utils/index');

const adminController = {};

adminController.registerAdmin = async (req, res) => {
  try {
    const admin = await createAdmin(req.body);
    return res.status(200).send({ message: 'Admin created successfully.', data: admin });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

adminController.login = async (req, res) => {
  try {
    const admin = await login(req.body, req.admin);
    if (admin) {
      return res.status(200).send({ message: 'Admin Loggedin successfully.', data: admin });
    }
    return res.status(400).send({ message: 'Invalid password' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

module.exports = adminController;
