
const performanceReviewFeedbackController = require('../controllers/performance.review.feedback.controller');

const { authJwt } = require("../middleware");

module.exports = function(app) {

    app.get(
        "/api/feedback/:id",
        authJwt.verifyToken,
        performanceReviewFeedbackController.findAll
      );
      app.post(
        "/api/feedback/create",
        authJwt.verifyToken,
        performanceReviewFeedbackController.create
      );

      app.put(
        "/api/feedback/:id",
        authJwt.verifyToken,
        performanceReviewFeedbackController.update
      );
    
}