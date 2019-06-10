/* eslint-disable */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: String,
  img: String,
  uid: String,
  view: Number,
  chartData: Object
}, { timestamps: true });

module.exports = mongoose.model('chart', userSchema);
