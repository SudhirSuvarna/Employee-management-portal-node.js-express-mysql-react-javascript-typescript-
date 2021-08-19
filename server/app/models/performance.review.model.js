module.exports = (sequelize, Sequelize) => {
    const performanceReview = sequelize.define("performanceReviews", {
      employee_id: {
        type: Sequelize.STRING
      },
      employee_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      }
    });
  
    return performanceReview;
  };
