const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  lat: { type: String, required: true },
  lng: { type: String, required: true },
  postcode: { type: String, required: true }
});

module.exports = mongoose.model('Course', courseSchema);
