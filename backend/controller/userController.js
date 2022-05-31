const User = require('../models/userModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');

// User Register
exports.registerUser = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'avatar public id',
      url: 'avatar_image_url',
    },
  });

  sendToken(user, 201, res);
});

// User Login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(new ErrorHandler('Please Enter Email', 400));
  }
  if (!password) {
    return next(new ErrorHandler('Please Enter Password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  sendToken(user, 200, res);
});

// Log Out User
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Log out user successfully!',
  });
});

// Get User
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Get All User: Admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    success: true,
    user,
  });
});

// Get Single User: Admin
exports.getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User Does not exist for this id: ${req.params.id}`, 401)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Role -- Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist for this id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete User -- admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist for this id: ${req.params.id}`, 404)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: 'User Delete Successfully!',
    user,
  });
});
