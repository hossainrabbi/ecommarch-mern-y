const productRoute = require('express').Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require('../controller/productController');

productRoute.route('/product/new').post(createProduct);
productRoute.route('/products').get(getAllProducts);
productRoute
  .route('/product/:id')
  .get(getProductDetails)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = productRoute;
