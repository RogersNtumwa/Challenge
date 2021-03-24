const bcrypt = require("bcryptjs");
const User = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// @desc     Register new user
// @route    Get/api/users/register
// @access   public
exports.Register = async (req, res, next) => {

  const errors = validationResult(req);

    //checking for an emputy required field
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ errors: [{ msg: "User already exists" }] });
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
    res.json(user);
};
// @desc     login user
// @route    Get/api/users
// @access   public
exports.logIn = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {firstName, lastName, email, password } = req.body;

//   checking if user email is valid
  const user = await User.findOne({ email });

  if (!user)
    return res
      .status(400)
      .json({ errors: [{ msg: "Invalid user credentials" }] });
      
   //   checking if user password is valid
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res
      .status(400)
      .json({ errors: [{ msg: "Invalid user credentials" }] });

  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRETE,
    {
      expiresIn: process.env.JWT_EXPIRE,
    },
    (err, token) => {
      if (err) return err;
      res.json({ token });
    }
  );
});

// @desc     Get Currently logged in user
// @route    Get/api/auth/user
// @access   private
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json(user);
});
