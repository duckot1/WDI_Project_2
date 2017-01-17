const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: { type: String, trim: true },
  type: { type: String, trim: true, required: true },
  url: { type: String, trim: true },
  description: { type: String },
  thumbnail: { type: String }
});

module.exports = mongoose.model('Activity', activitySchema);
