/* eslint-disable */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: String,
  img: String,
  chartData: Object
});

module.exports = mongoose.model('chart', userSchema);
