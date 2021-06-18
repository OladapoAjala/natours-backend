const User = require('../models/userModels');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterData = (dataObj, ...allowedFields) => {
  const filteredObj = {};
  allowedFields.forEach((field) => {
    filteredObj[field] = dataObj[field];
  });

  return filteredObj;
};

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

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This url is not for password update', 400));
  }

  const filteredData = filterData(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
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
