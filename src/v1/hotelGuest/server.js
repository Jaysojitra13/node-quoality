const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config({ path: '../../../.env' });
// DB connection
require('../../../config/dababase');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/hotel-guest', require('./routes/index'));

app.listen(process.env.HOTEL_GUEST, () => {
  console.log(`Hotel is listening on port ${process.env.HOTEL_GUEST}`);
});
