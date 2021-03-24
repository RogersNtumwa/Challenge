const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  Register,
  logIn,
  getCurrentUser,
  
} = require("../controllers/auth");
const { protect, authourize } = require("../middleware/authourise");

router
  .route("/")
  .post(
    [
      check("email", "Avallid email is required").isEmail().not().isEmpty(),
      check("password", "Password is required").not().isEmpty(),
    ],
    logIn
  );

router
  .route("/register")
  .post(
    [
      check("firstName", "Name is required").not().isEmpty(),
      check("lastName", "Name is required").not().isEmpty(),
      check("email", "Avallid email is required").isEmail().not().isEmpty(),
      check("password", "Password is required").not().isEmpty(),
    ],
    Register
  );
router.route("/user").get(protect, getCurrentUser);

module.exports = router;