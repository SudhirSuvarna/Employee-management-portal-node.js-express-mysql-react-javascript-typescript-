module.exports = (sequelize, Sequelize) => {
    const performanceReviewFeedback = sequelize.define("performanceReviewsFeedback", {
      employee_id: {
        type: Sequelize.STRING
      },
      employee_name: {
        type: Sequelize.STRING
      },
      assignee_name: {
        type: Sequelize.STRING
      },
      feedback: {
        type: Sequelize.STRING
      }
    });
    return performanceReviewFeedback;
  };
