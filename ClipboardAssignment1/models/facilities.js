const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  }
});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;
