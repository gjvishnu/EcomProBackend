const Cart = require("../model/cart");
const catchMonErr = require("../middleware/catchMongooseErr");
const Errorhand = require("../utils/errorhand");
const jwt = require("jsonwebtoken");

// create cart product api

exports.addToCart = catchMonErr(async (req, res, next) => {
  const cart = await Cart.create(req.body);
  res.status(202).json({
    success: true,
    cart,
  });
});

// get all data from cart by user's id

exports.getCartItems = catchMonErr(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new Errorhand("login to handle this resource", 401));
  }
  const decodedId = jwt.verify(token, process.env.JWT_SECRET);
  decodedId.id;
  let user = decodedId.id;
  const cart = await Cart.find({ user });

  res.status(202).json({
    success: true,
    cart,
  });
});

// delete cart items

exports.deleteCartItem = catchMonErr(async (req, res, next) => {
  let cart = await Cart.findById(req.params.id);

  if (!cart) {
    return next(new Errorhand("product not found", 404));
  }
  await cart.deleteOne();

  res.status(202).json({
    success: true,
    message: "deleted product",
  });
});
