const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  addregisterapi,
} = require("../controllers/authController");

const router = express.Router();

//register
router.post("/register", addregisterapi);

router.post("/re", registerController);

router.post("/login", loginController);

router.post("/logout", logoutController);

module.exports = router;
