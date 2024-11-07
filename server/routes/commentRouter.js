const express = require('express');

const Controller = require('../controller/commentController');
const {
  verifyAccessToken,
  verifyFile,
  verifyParams,
  verifyNotReqParams,
} = require('../controller/authController.js');
const { requiredParams, notRequiredParams } = require('../helper/checker.js');

const router = express.Router();

router
  .route(`/`)
  .get(
    [
      verifyAccessToken,
      verifyParams(requiredParams['get:comments'], 'query'),
      verifyNotReqParams(notRequiredParams['get:comments'], 'query'),
    ],
    Controller.getAll
  )
  .post(
    [
      verifyAccessToken,
      verifyFile,
      verifyParams(requiredParams['post:comments'], 'body'),
    ],
    Controller.postOne
  )
  .delete(verifyAccessToken, Controller.deleteOne);

module.exports = router;
