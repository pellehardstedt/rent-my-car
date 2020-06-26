const mongoose = require('mongoose');
const { Schema } = mongoose;

const Car = new Schema({
  reg: String
});

mongoose.model('car', Car)

module.exports = Car;
