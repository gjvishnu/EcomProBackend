const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchmea = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter name"],
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: [true, "email already exists"],
    validate: [validator.isEmail, "please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    select: false,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchmea.methods.generateJWTtoken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

userSchmea.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchmea.methods.isValidpassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

let model = mongoose.model("user", userSchmea);
module.exports = model;
