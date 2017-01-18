const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String },
  lat: { type: String, required: true },
  lng: { type: String, required: true },
  activities: [ { type: mongoose.Schema.ObjectId, ref: 'Activity' } ]
});

module.exports = mongoose.model('Place', placeSchema);
