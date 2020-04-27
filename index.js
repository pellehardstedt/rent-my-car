const keys = require('./config/keys');

const express = require('express');
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

const app = express();
const port = 3000

app.use(Rest.start({
  mongoURI: keys.mongoURI,
  baseUrl: "/api"
}));

app.get('/', (req ,res) => res.send("hello world"));

app.listen(port, function(){
  console.log("listening on port 3000")
});
