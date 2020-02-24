const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  google: { type: String, unique: true },
  tokens: Array
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
