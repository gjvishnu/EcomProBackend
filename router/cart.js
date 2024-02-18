const express = require("express");
const Router = express.Router();
const {
  addToCart,
  getCartItems,
  deleteCartItem,
} = require("../controller/cartController");

Router.post("/cart/new", addToCart);
Router.get("/cart/items", getCartItems);
Router.delete("/cart/delete/:id", deleteCartItem);

module.exports = Router;
