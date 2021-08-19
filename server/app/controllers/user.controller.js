const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.findAll = (req, res) => {
  User.findAll({
      where:{
        
      },
      limit:100
    }).then(function(users){
      res.send({error:false,message:'Users list',data:users});
    }).catch(function(err){
      console.log('Oops! something went wrong, : ', err);
    });
};
