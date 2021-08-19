const db = require("../models");
const config = require("../config/auth.config");
const Employee = db.employee;


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  // Save Employee to Database
  Employee.create(req.body)
    .then(user => {
        res.send({ message: "EMPLOYEE RECORD CREATED successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
    Employee.findAll({
        where:{
          
        },
        limit:100
      }).then(function(employees){
        console.log(employees);
        res.send({error:false,message:'Employees list',data:employees});
      }).catch(function(err){
        console.log('Oops! something went wrong, : ', err);
      });
};

exports.update = (req, res) => {
    Employee.update(
        // Set Attribute values 
        req.body,
        
        // Where clause / criteria 
        {where: {
          id: req.params.id
         } 
        }
       ).then(function(result){
            res.send({ message: "EMPLOYEE RECORD updated successfully!" });
       }).catch(function(err) { 
          res.status(500).send({ message: err.message });
           //handle error here
       });
};

exports.delete = (req, res) => {
    Employee.destroy({
        where: {
         id: req.params.id
        }
       }).then(count => {
        if (!count) {
         return res.status(404).send({error: 'No user'});
        }
        res.status(204).send();
    });
};



