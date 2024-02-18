const User = require("../model/user");
const catchMonErr = require("../middleware/catchMongooseErr");
const jwt = require("jsonwebtoken");
const Errorhand = require("../utils/errorhand");

exports.isAuthenticatedUser = catchMonErr(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new Errorhand("login to handle this resource", 401));
  }
  const decodedId = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedId.id);
  next();
});

exports.isAuthenticatedRole = catchMonErr(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new Errorhand("you don't have permission to access this service", 401)
    );
  }
  next();
});
