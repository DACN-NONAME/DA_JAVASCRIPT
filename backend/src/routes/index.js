"use strict";
const express = require("express");
const router = express.Router();

router.use("/user", require("./user.route"));
router.use("/webhook", require("./webhook.route"));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "Welcome to the homepage." });
});

/* Test Route */
router.get("/test", function (req, res, next) {
  res.json({ result: "Test success!" });
});

module.exports = router;
