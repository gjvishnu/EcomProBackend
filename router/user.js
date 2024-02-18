const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getAllusers,
  myprofile,
  changePassword,
  editProfile,
  getSingleUser,
  editUser,
  deleteUser,
} = require("../controller/authController");
const {
  isAuthenticatedUser,
  isAuthenticatedRole,
} = require("../middleware/authentication");

router.post("/user/new", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user/profile", isAuthenticatedUser, myprofile);
router.put("/user/changepassword", isAuthenticatedUser, changePassword);
router.put("/user/edit", isAuthenticatedUser, editProfile);


//admin routes
router.get("/admin/users",isAuthenticatedUser, isAuthenticatedRole, getAllusers);
router.get("/admin/user/:id",isAuthenticatedUser, isAuthenticatedRole, getSingleUser);
router.put("/admin/user/edit/:id",isAuthenticatedUser, isAuthenticatedRole, editUser);
router.delete("/admin/user/delete/:id",isAuthenticatedUser, isAuthenticatedRole, deleteUser);

module.exports = router;
