const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema
const hotelGuestSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'hotel',
    },
    bookedDate: {
      type: Date,
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

const hotelGuestModel = mongoose.model('hotelGuest', hotelGuestSchema);
module.exports = hotelGuestModel;
