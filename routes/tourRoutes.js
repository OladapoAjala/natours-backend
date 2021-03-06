const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

// router.param('id', tourController.checkID);

/**********
 * API router for getting top five most rated tours ranked in descending order of price
 * **********/
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

/**********
 * API routers for:
 *    aggregate tours with ratings above 4.5
 *    group by difficulty
 *    calculate average rating per group
 *    calculate average price per group
 *    calculate minimum price per group
 *    calculate maximum price per group
 **********/
router.route('/tour-stats').get(tourController.getTourStats);

/**********
 * API router for:
 *    getting monthly tour schedules in a particular year
 **********/
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

/**********
 * API router for:
 *    getting all tours
 *    creating a tour
 **********/
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

/**********
 * API router for:
 *    getting tour by ID
 *    updating sections of a tour identified by ID
 *    delete a tour using ID
 **********/
router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.getTour
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
