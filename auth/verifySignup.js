const ROLES = require('../models/Role');
const User = require('../models/User');

checkDuplicateUsernameOrEmail = (req,res,next) => {
  console.log("inside check duplicate")

  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if(err) {
      res.status(500).send({ message: err});
      return;
    }
    if(user) {
      res.status(400).send({message: "Failed! Username already in use"});
      return;
    }
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if(err) {
        res.status(500).send({message:err})
        return;
      }
      if(user) {
        res.status(400).send({message: "Failed! Email already in use"})
      }
      next();
    })
  })
}

checkRolesExisted = (req,res,next) => {
  if(req.body.roles) {
    for(let i = 0; i < req.body.roles.length; i++) {

      //error: ROLES.includes() is not a function ???

      // if(!ROLES.includes(req.body.roles[i])) {
      //   res.status(400).send({
      //     message: `Failed! Roles ${req.body.roles[i]} does not exist!`
      //   });
      //   return;
      // }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp
