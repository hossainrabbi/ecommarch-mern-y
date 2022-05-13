const productRoute = require('express').Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
} = require('../controller/productController');

productRoute.route('/product/new').post(createProduct);
productRoute.route('/products').get(getAllProducts);
productRoute.route('/product/:id').put(updateProduct);

module.exports = productRoute;
