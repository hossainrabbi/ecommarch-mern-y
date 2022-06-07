const orderRouter = require('express').Router();
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require('../controller/orderController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

orderRouter.route('/order/new').post(isAuthenticatedUser, newOrder);
orderRouter.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
orderRouter.route('/orders/me').get(isAuthenticatedUser, myOrders);

orderRouter
  .route('/admin/orders')
  .get(isAuthenticatedUser, authorizeRole('admin'), getAllOrders);

orderRouter
  .route('/admin/order/:id')
  .put(isAuthenticatedUser, authorizeRole('admin'), updateOrder)
  .delete(isAuthenticatedUser, authorizeRole('admin'), deleteOrder);

module.exports = orderRouter;
