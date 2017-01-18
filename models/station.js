const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: String, required: true },
  lng: { type: String, required: true },
  code: { type: String }
});

module.exports = mongoose.model('Station', stationSchema);
