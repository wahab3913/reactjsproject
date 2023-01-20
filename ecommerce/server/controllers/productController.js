const Product = require("../models/productmodel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const getProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.find();
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    message: product,
  });
});
const postProduct = catchAsyncErrors(async (req, res, next) => {
  const addproduct = await Product.create(req.body);
  res.status(200).json({
    message: "Product Add Successfully",
    product: addproduct,
  });
});
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
  res.status(200).json({
    message: "Update Product",
    update: product,
  });
});

const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  product = await Product.remove();
  res.status(200).json({
    message: "Delete Product Successfully",
  });
});

const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    message: "Product Found",
    product: product,
  });
});
module.exports = {
  postProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
};
