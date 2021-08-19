
const employeeController = require('../controllers/employee.controller');

const { authJwt } = require("../middleware");

module.exports = function(app) {

    app.get(
        "/api/employees",
        authJwt.verifyToken,
        employeeController.findAll
      );
      app.post(
        "/api/employees/create",
        authJwt.verifyToken,
        employeeController.create
      );

      app.delete(
        "/api/employees/:id",
        authJwt.verifyToken,
        employeeController.delete
      );

      app.put(
        "/api/employees/:id",
        authJwt.verifyToken,
        employeeController.update
      );
    
}