const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  passwordHash: { type: String },
  passwordConfirmation: { type: String }
}, {
  timeStamps: true
});

module.exports = mongoose.model('User', userSchema);
