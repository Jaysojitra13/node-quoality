const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema
const hotelSchema = new Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    totalRooms: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const hotelModel = mongoose.model('hotel', hotelSchema);
module.exports = hotelModel;
