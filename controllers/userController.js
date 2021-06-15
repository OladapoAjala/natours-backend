const User = require('../models/userModels');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > 9) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

// USER HANDLERS
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find(req.body);

  if (!users) {
    return next(new AppError('No user registered yet', 400));
  }

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: "This route hasn't been implemented yet",
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: "This route hasn't been implemented yet",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: "This route hasn't been implemented yet",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: "This route hasn't been implemented yet",
  });
};
