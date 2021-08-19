module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employees", {
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      organization: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      }
    });
  
    return Employee;
  };
