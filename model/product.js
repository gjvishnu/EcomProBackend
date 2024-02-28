const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required:  [true,"please enter product name"],

  },
  price: {
    type: Number,
    required:  [true,"please enter price"],

  },
  description: {
    type: String,
    required:  [true,"please enter description"],
  },
  images: [
    {
      image: {
        type: String,
        required:  [true,"please select image"]
      },
    },
  ],
  category: {
    type: String,
    required:  [true,"please enter category"],
  },
  gender : {
    type: String,
    required:  [true,"please enter gender"],
  },
  seller: {
    type: String,
    required:  [true,"please enter seller"],
  },
  stock: {
    type: Number,
    required:  [true,"please enter stock"],
  },
  reviews: [
    {
      name: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let schema = mongoose.model("products", productSchema);

module.exports = schema