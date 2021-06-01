const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const cors = require('cors');
const l10n = require('jm-ez-l10n');

dotenv.config({ path: '../../../.env' });
// DB connection
require('../../../config/dababase');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', require('./routes/index'));

l10n.setTranslationsFile('en', '../../commonUtils/translation.en.json');
app.use(l10n.enableL10NExpress);

global.l10n = l10n;

if (cluster.isMaster) {
  // If traffic to this pod will increase in future then we can add more .fork(). Max number
  // of fork should be equeal to number of cores of cpu
  console.log(`Master ${process.pid} is running`);
  cluster.fork();
  cluster.fork();
} else {
  app.listen(process.env.HOTEL_PORT, () => {
    console.log(`Hotel is listening on port ${process.env.HOTEL_PORT}`);
    console.log(`Worker ${process.pid} started`);
  });
}
