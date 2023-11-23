const express = require("express");
const userController = require("../controller/Auth");
const router = express.Router();

router
  .post("/signup", userController.signupUser)
  .post("/login", userController.loginUser)
  .post("/updateUser", userController.updateUser);

exports.router = router;
