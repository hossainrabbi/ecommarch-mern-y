const User = require('../models/userModel');
const catchAsyncError = require('../middleware/catchAsyncError');

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

  res.status(201).json({
    success: true,
    user,
  });
});
