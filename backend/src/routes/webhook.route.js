"use strict";
const express = require("express");
const router = express.Router();
const fn = require("../../conf/function");
const webhookController = require("../controllers/webhook.controller");

router.route("/").post(webhookController.webhook);

module.exports = router;
