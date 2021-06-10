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
exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: "This route hasn't been implemented yet",
  });
};

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
