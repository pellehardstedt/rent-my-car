const config = require('../config/auth.config');
const User = require('../models/User');
const Role = require('../models/Role');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs')

const saltRounds = 10;

exports.signup = async (req,res) => {
  console.log("INCOMING REQUEST")
  console.log(req.body)

  const salt = await bcrypt.genSaltSync(8);
  const password = await bcrypt.hash(req.body.password, saltRounds);
  console.log("password hash: " + password)

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: password
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            console.log("1st: User registered")
            res.send({ message: "1st User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          console.log("2st: User registered")
          res.send({ message: "2nd User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  console.log("INCOMING SIGN IN REQUEST")
  console.log(req.body)
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec( async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      console.log("Is password vaild? " + passwordIsValid)
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
      console.log("end of sign in! " + token)
    });
};
