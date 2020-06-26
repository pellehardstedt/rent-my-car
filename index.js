const keys = require('./config/keys');

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Rest = require('./rest.class.js');
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000"
};

Rest.start({
  mongoURI: keys.mongoURI,
  baseUrl: "/api"
})

//mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})

//const User = mongoose.model('user')
//const Car = mongoose.model('car')

//User.findOneAndDelete({name: ""})

const app = express();
const port = 3000
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const User = require('./models/User');
const Role = require('./models/Role');

app.use(Rest.start({
  mongoURI: keys.mongoURI,
  baseUrl: "/api"
}));

initial();

app.get('/', (req ,res) => res.send());


app.listen(port, function(){
  console.log("listening on port 3000")
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
