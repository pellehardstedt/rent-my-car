const keys = require('./config/keys');

const express = require('express');
const mongoose = require('mongoose');

require('./models/user')
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})

const User = mongoose.model('users')

const app = express();
const port = 3000

app.get('/', (req ,res) => res.send("hellow world"));

app.get('/api/users', async (req,res) => {
  const pelle = await User.findOne({name:"pelle"})
  console.log(pelle)
  res.send(pelle)
});


app.listen(port, function(){
  console.log("listening on port 3000")
});
