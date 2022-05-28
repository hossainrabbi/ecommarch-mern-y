const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');

// Create Product -- admin
exports.createProduct = catchAsyncError(async (req, res) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const productCount = await Product.countDocuments();

  const resultParPage = 5;

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultParPage);
  const product = await apiFeatures.query;

  res.status(200).json({ success: true, product, productCount });
});

// Get Single Products
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ success: true, product });
  } catch {
    next(new ErrorHandler('Product not Found!', 404));
  }
});

// Update Product using by id -- admin
exports.updateProduct = catchAsyncError(async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch {
    next(new ErrorHandler('Product not Found!', 404));
  }
});

// Delete Product using by id -- admin
exports.deleteProduct = catchAsyncError(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    await product.remove();

    res.status(200).json({
      success: true,
      message: 'Product Delete Successfully!',
    });
  } catch {
    next(new ErrorHandler('Product not Found!', 404));
  }
});
