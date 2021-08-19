const db = require("../models");
const config = require("../config/auth.config");
const feedback = db.feedback;


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");

exports.create = (req, res) => {

    feedback.create(req.body)
    .then(result => {
        res.send({ message: "Performance review feeback request created" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
    console.log("inside get reviews");
    console.log(req.headers);
    feedback.findAll({
        where:{
          
        },
        limit:100
      }).then(function(performanceReviewsFeedback){
        if(req.headers['role'] !== 'admin') {
            performanceReviewsFeedback = performanceReviewsFeedback.filter((item) => item['assignee_name'] === req.params.id );
        }
        res.send({error:false,message:'Performance reviews list',data:performanceReviewsFeedback});
      }).catch(function(err){
        console.log('Oops! something went wrong, : ', err);
      });
};

exports.update = (req, res) => {
    feedback.update(
        // Set Attribute values 
        req.body,
        
        // Where clause / criteria 
        {where: {
          id: req.params.id
         } 
        }
       ).then(function(result){
            res.send({ message: "Performance review feedback updated successfully!" });
       }).catch(function(err) { 
          res.status(500).send({ message: err.message });
           //handle error here
       });
};



