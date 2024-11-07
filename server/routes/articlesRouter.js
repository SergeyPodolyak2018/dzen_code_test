const express = require('express');
const Controller = require('../controller/articleController.js');
const { checkId } = require('../helper/checker.js');
const { verifyAccessToken } = require('../controller/authController.js');

const router = express.Router();
router.param('id', checkId);

router
  .route(`/`)
  .get(verifyAccessToken, Controller.getAll)
  .post(verifyAccessToken, Controller.postOne);
router
  .route(`/:id`)
  .get(verifyAccessToken, Controller.getOne)
  .delete(verifyAccessToken, Controller.deleteOne);

module.exports = router;
