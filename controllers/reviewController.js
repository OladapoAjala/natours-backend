const Review = require('../models/reviewModels');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const factory = require('./handlerFactory');

exports.preventMultipleReviews = catchAsync(async (req, res, next) => {
  const filter = {
    user: req.user.id,
    tour: req.body.tour,
  };

  if (!req.body.tour) filter.tour = req.params.tourId;

  const review = await Review.find(filter);

  if (review.length) {
    return next(new AppError("You can't have multiple reviews", 401));
  }

  next();
});

exports.setTourAndUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
