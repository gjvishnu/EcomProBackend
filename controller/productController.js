const mongoose = require("mongoose");
const Product = require("../model/product");
const Errorhand = require("../utils/errorhand");
const catchMonErr = require("../middleware/catchMongooseErr");
// create products api - api/product/new

exports.createProduct = catchMonErr(async (req, res, next) => {
  let images = [];

  if (req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${process.env.BACKEND_URL}/uploads/products/${file.originalname}`;
      images.push({ image: url });
    });
  }
  req.body.images = images;
  const product = await Product.create(req.body);
  res.status(202).json({
    success: true,
    product,
  });
});
// get all products data in the api api/products

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  if (!products) {
    res.status(404).json({
      success: false,
      message: "no products available",
    });
    return;
  }
  res.status(200).json({
    success: true,
    products,
  });
};

// get single product api - api/product/:id

exports.getSingleProduct = catchMonErr(async (req, res, next) => {
  const id = req.params.id;

  const product = await Product.findById(id);
  if (!product) {
    return next(new Errorhand("product not found", 404));
  }
  res.status(201).json({
    success: true,
    product,
  });
});
// update product api - api/product/:id

exports.updateProduct = catchMonErr(async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    return next(new Errorhand("product not found", 404));
  }
  product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({
    success: true,
    product,
  });
});

// delete product api - api/product/:id

exports.deleteProduct = catchMonErr(async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    return next(new Errorhand("product not found", 404));
  }
  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "product deleted",
  });
});
