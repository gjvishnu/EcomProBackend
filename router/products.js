const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

router.post("/product/new", createProduct);
router.get("/products", getProducts);
router.get("/product/:id", getSingleProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);
module.exports = router;
