const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'guest'],
      default: 'guest',
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

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
