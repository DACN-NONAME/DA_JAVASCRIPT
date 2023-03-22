"use strict";
const express = require("express");
const router = express.Router();
const fn = require("../../conf/function");
const userController = require("../controllers/user.controller");

router
  .route("/check-session")
  .all(fn.verifyAuthen)
  .get(userController.checkSession)
  .post(userController.checkSession);

router.route("/login").post(userController.login);
router.route("/register").post(userController.register);

router
  .route("/me")
  .all(fn.verifyAuthen)
  .get(userController.getMe)
  .post(userController.updateMe)
  .put(userController.updateMe);

router.route("/avatar/:user_id").get(userController.getAvatar);

module.exports = router;
