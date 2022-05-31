const userRouter = require('express').Router();
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUser,
  updateUserRole,
  deleteUser,
} = require('../controller/userController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').get(logout);

userRouter.route('/me').get(isAuthenticatedUser, getUserDetails);
userRouter.route('/me/update').put(isAuthenticatedUser, updateProfile);
userRouter.route('/password/update').put(isAuthenticatedUser, updatePassword);

userRouter
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizeRole('admin'), getAllUsers);

userRouter
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRole('admin'), getUser)
  .put(isAuthenticatedUser, authorizeRole('admin'), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRole('admin'), deleteUser);

module.exports = userRouter;
