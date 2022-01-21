const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  share: {
    type: Number,
    required: true,
    default: 0,
  },
  paid: {
    type: Number,
    required: true,
    default: 0,
  },
});

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [memberSchema],
});

module.exports = mongoose.model('Group', groupSchema);
