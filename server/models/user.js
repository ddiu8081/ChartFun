/* eslint-disable */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);
