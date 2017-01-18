const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  city: { type: String, required: true },
  stadium: { type: String },
  id: { type: String, required: true }
});

module.exports = mongoose.model('Team', teamSchema);
