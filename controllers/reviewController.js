const Review = require('../models/reviewModels');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find(req.body);

  if (!reviews.length) {
    return next(new AppError('No review found', 400));
  }

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.preventMultipleReviews = catchAsync(async (req, res, next) => {
  const review = await Review.find({
    user: req.user.id,
    tour: req.body.tour,
  });

  if (review.length) {
    return next(new AppError("You can't have multiple reviews", 401));
  }

  next();
});

exports.createReview = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
