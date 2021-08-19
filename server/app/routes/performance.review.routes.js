
const performanceReviewController = require('../controllers/performance.review.controller');

const { authJwt } = require("../middleware");

module.exports = function(app) {

    app.get(
        "/api/reviews",
        authJwt.verifyToken,
        performanceReviewController.findAll
      );
      app.post(
        "/api/reviews/create",
        authJwt.verifyToken,
        performanceReviewController.create
      );

      app.put(
        "/api/reviews/:id",
        authJwt.verifyToken,
        performanceReviewController.update
      );
    
}