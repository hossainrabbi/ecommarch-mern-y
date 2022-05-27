const userRouter = require('express').Router();
const { registerUser, loginUser } = require('../controller/userController');

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);

module.exports = userRouter;
