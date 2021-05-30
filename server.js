const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
// db connection
require('./config/dababase');

const app = express();

global.basePath = `${__dirname}/`;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', require('./src/v1/routes/index'));

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
