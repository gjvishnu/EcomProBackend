const User = require("../model/user");
const catchMonErr = require("../middleware/catchMongooseErr");
const jwt = require("jsonwebtoken");
const Errorhand = require("../utils/errorhand");

// register user
exports.registerUser = catchMonErr(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  const user = await User.create({ name, email, password, avatar });

  const token = user.generateJWTtoken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    http: true,
  };

  res.status(201).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
});

// login user
exports.loginUser = catchMonErr(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Errorhand("please enter email or password", 401));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new Errorhand("Invalid email or password", 401));
  }

  if (!(await user.isValidpassword(password))) {
    return next(new Errorhand("Invalid email or password", 401));
  }
  const token = user.generateJWTtoken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    http: true,
  };

  res.status(201).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
});

// logout user

exports.logoutUser = catchMonErr(async (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "user logged out",
    });
});

// user profile

exports.myprofile = catchMonErr(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new Errorhand("user not found", 404));
  }
  res.status(201).json({
    success: true,
    user,
  });
});

// change password api

exports.changePassword = catchMonErr(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.isValidpassword(req.body.oldpassword))) {
    return next(new Errorhand("wrong password", 401));
  }

  user.password = req.body.newpassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "password changed",
  });
});

// edit profile controller

exports.editProfile = catchMonErr(async (req, res, next) => {
  let newData = {
    name: req.body.name,
    emai: req.body.email,
    avatar: req.body.avatar,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "update..!",
    user,
  });
});

// admin get all user

exports.getAllusers = catchMonErr(async (req, res, next) => {
  const users = await User.find();

  if (!users) {
    return next(new Errorhand("no user found"));
  }

  res.status(201).json({
    success: true,
    users,
  });
});

// get single user
exports.getSingleUser = catchMonErr(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id);
  if (!user) {
    return next(new Errorhand("no user found"));
  }
  res.status(201).json({
    success: true,
    user,
  });
});

// edit user

exports.editUser = catchMonErr(async (req, res, next) => {
  const id = req.params.id;
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "update..!",
    user,
  });
});

// delete user

exports.deleteUser = catchMonErr(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "deleted..!",
  });
});
