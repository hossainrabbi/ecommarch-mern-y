const userRouter = require('express').Router();
const { registerUser } = require('../controller/userController');

userRouter.route('/register').post(registerUser);

module.exports = userRouter;
