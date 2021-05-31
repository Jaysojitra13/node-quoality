const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema
const hotelServiceSchema = new Schema(
  {
    name: {
      type: String,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'hotel',
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

const hotelModel = mongoose.model('hotelService', hotelServiceSchema);
module.exports = hotelModel;
