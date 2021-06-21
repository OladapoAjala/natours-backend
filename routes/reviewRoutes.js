/**
 * Implement Get all reviews
 * Implement create a new review
 */

const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user', 'guide'),
    reviewController.preventMultipleReviews,
    reviewController.createReview
  );

module.exports = router;
