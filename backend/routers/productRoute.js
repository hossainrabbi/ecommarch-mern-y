const productRoute = require('express').Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require('../controller/productController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

productRoute.route('/products').get(getAllProducts);
productRoute
  .route('/product/new')
  .post(isAuthenticatedUser, authorizeRole('admin'), createProduct);
productRoute
  .route('/product/:id')
  .get(getProductDetails)
  .put(isAuthenticatedUser, authorizeRole('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRole('admin'), deleteProduct);

module.exports = productRoute;
