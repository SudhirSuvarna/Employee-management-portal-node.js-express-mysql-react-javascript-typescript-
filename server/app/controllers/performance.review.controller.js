const db = require("../models");
const config = require("../config/auth.config");
const performanceReview = db.performanceReview;


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  performanceReview.create(req.body)
    .then(user => {
        res.send({ message: "Performance review record CREATED successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
    performanceReview.findAll({
        where:{
          
        },
        limit:10
      }).then(function(performanceReviews){
        res.send({error:false,message:'Performance reviews list',data:performanceReviews});
      }).catch(function(err){
        console.log('Oops! something went wrong, : ', err);
      });
};

exports.update = (req, res) => {
    performanceReview.update(
        // Set Attribute values 
        req.body,
        
        // Where clause / criteria 
        {where: {
          id: req.params.id
         } 
        }
       ).then(function(result){
            res.send({ message: "Performance review record updated successfully!" });
       }).catch(function(err) { 
          res.status(500).send({ message: err.message });
           //handle error here
       });
};



