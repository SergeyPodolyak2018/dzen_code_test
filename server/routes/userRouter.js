const express = require('express');
const {
  loginUser,
  loginUserPage,
  userSignUpPage,
  postUser,
  info,
} = require('../controller/userController.js');
const { verifyAccessToken } = require('../controller/authController.js');

const router = express.Router();

router.route(`/login`).get(loginUserPage).post(loginUser);

router.route(`/signup`).get(userSignUpPage).post(postUser);
router.route(`/info`).get(verifyAccessToken, info);

module.exports = router;
