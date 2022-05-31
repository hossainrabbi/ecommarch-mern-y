const productRoute = require('express').Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require('../controller/productController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

productRoute.route('/products').get(getAllProducts);

productRoute
  .route('/admin/product/new')
  .post(isAuthenticatedUser, authorizeRole('admin'), createProduct);

productRoute
  .route('/admin/product/:id')
  .get(getProductDetails)
  .put(isAuthenticatedUser, authorizeRole('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRole('admin'), deleteProduct);

productRoute.route('/product/:id').get(getProductDetails);
productRoute.route('/review').put(isAuthenticatedUser, createProductReview);
productRoute
  .route('/reviews')
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = productRoute;
