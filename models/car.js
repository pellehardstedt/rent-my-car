const mongoose = require('mongoose');
const { Schema } = mongoose;

const carSchema = new Schema({
  reg: String
});

mongoose.model('cars', carSchema)
