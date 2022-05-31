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

// Create Product Review or Update Review
exports.createProductReview = catchAsyncError(async (req, res) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((r) => {
      if (r.user.toString() === req.user._id.toString()) {
        (r.rating = rating), (r.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReview = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((r) => (avg += r.rating));

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All reviews
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler('Page not Found!', 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler('Page not Found!', 404));
  }

  const reviews = product.reviews.filter(
    (r) => r._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((r) => (avg += r.rating));

  const ratings = avg / reviews.length;
  const numOfReview = product.reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReview,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
