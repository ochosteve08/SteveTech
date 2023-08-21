const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const loginLimiter = require("../middleware/LoginLimiter");

router.route("/").post(loginLimiter, authController.Login);

router.route("/refresh").get(authController.Refresh);

router.route("/logout").post(authController.Logout);

module.exports = router;
