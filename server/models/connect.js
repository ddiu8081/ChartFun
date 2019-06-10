/* eslint-disable */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectSchema = new Schema({
  name: String,
  uid: String,
  data: Object
}, { timestamps: true });

module.exports = mongoose.model('connect', connectSchema);
