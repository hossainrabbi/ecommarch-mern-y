const userRouter = require('express').Router();
const {
  registerUser,
  loginUser,
  logout,
} = require('../controller/userController');

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').get(logout);

module.exports = userRouter;
