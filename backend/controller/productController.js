const Product = require('../models/productModel');

// Create Product -- admin
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  const product = await Product.find();

  res.status(200).json({ success: true, product });
};

// Get Single Products
exports.getProductDetails = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: 'Product not Found!' });
  }

  res.status(200).json({ success: true, product });
};

// Update Product using by id -- admin
exports.updateProduct = async (req, res) => {
  let product = await Product.findById({ _id: req.params.id });

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: 'Product not Found!' });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

// Delete Product using by id -- admin
exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: 'Product not Found!' });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: 'Product Delete Successfully!',
  });
};
