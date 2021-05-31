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

app.use('/', require('./routes/index'));

app.listen(process.env.HOTEL_SERVICE_PORT, () => {
  console.log(`Hotel Service is listening on port ${process.env.HOTEL_SERVICE_PORT}`);
});
