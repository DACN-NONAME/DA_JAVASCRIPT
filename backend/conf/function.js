const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

let fn = {};

fn.bcryptHash = (str) => {
  return bcrypt.hashSync(str, bcrypt.genSaltSync(10));
};

fn.bcryptVerify = (str, hash) => {
  return bcrypt.compareSync(str, hash);
};

fn.hashMD5 = (str) => {
  return crypto.createHash("md5").update(str).digest("hex");
};

fn.hashSHA256 = (str) => {
  return crypto.createHash("sha256").update(str).digest("hex");
};

fn.escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

fn.signToken = (obj) => {
  return jwt.sign(
    { ...obj, iat: Math.floor(Date.now() / 1000) },
    process.env.PASSWORD
  );
};

fn.verifyToken = function (token) {
  try {
    return jwt.verify(token, process.env.PASSWORD);
  } catch (err) {
    return null;
  }
};

fn.isNumeric = function (str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};

fn.checkSession = function (token) {
  let parse = fn.verifyToken(token);
  if (parse && parse.iat <= Math.floor(Date.now() / 1000) + 60 * 60 * 24)
    return true;
  return false;
};

fn.verifyAuthen = async (req, res, next) => {
  let bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    let bearer = bearerHeader.split(" ");
    let token = bearer[1];
    if (fn.checkSession(token)) {
      let parse = fn.verifyToken(token);
      req.username = parse.username;
      req.token = token;
      next();
      return;
    }
  }
  res.status(403);
  res.send({ success: false, message: "Unable to authenticate!" });
};

module.exports = fn;
