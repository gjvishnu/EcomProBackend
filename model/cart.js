const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
   },
  price: {
    type: Number,
    required: [true, "please enter price"],
  },
  description: {
    type: String,
    required: [true, "please enter description"],
  },
  images: [
    {
      image: {
        type: String,
        required: [true, "please select image"],
      },
    },
  ],

  quantity: {
    type: Number,
    required: [true, "please select quatity"],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
