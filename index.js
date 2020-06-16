const keys = require('./config/keys');

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Rest = require('./rest.class.js');


Rest.start({
  mongoURI: keys.mongoURI,
  baseUrl: "/api"
})

require('./models/user')
require('./models/car')

//mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})

const Users = mongoose.model('users')
const Cars = mongoose.model('cars')

Users.findOneAndDelete({name: ""})

const app = express();
const port = 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(Rest.start({
  mongoURI: keys.mongoURI,
  baseUrl: "/api"
}));

app.get('/', (req ,res) => res.send());

app.listen(port, function(){
  console.log("listening on port 3000")
});
