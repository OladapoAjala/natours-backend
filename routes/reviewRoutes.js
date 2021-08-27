/**
 * Implement Get all reviews
 * Implement create a new review
 */

const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourAndUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    reviewController.updateReview,
    authController.restrictTo('admin', 'user')
  )
  .delete(
    reviewController.updateReview,
    authController.restrictTo('admin', 'user'),
    reviewController.deleteReview
  );

module.exports = router;
