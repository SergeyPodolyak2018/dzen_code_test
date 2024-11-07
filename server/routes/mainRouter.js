const express = require('express');
const { verifyAccessToken } = require('../controller/authController.js');
const path = require('path');

const router = express.Router();

router.route(`/`).get(verifyAccessToken, (req, res) => {
  res.sendFile(path.join(__dirname, '../view/index.html'));
  //TODO
  //res.redirect('http://localhost:5173');
});

module.exports = router;
