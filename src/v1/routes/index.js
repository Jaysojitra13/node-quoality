const express = require('express');

const route = express.Router();

route.use('/hotel', require('../hotel/routes/index'));

module.exports = route;
