const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter your name'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
    minLength: [3, 'Name should have more then 3 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please Enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please Enter your password'],
    minLength: [6, 'Password should have more then 6 characters'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

module.exports = mongoose.model('User', userSchema);
