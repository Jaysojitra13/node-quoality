const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to the database...');
  })
  .catch((err) => {
    console.log('Error in connection with database!!!', err);
    process.exit();
  });
