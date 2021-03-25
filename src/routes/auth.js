const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  Register,
  logIn,
  getCurrentUser,
  updateUser,
  
} = require("../controllers/auth");
const { protect } = require("../middleware/authourise");

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
router.route("/loggedin").get(protect, getCurrentUser);
router.route("/:id").put(protect,updateUser)

module.exports = router;