"use strict";
const mongoose = require("mongoose");
const fn = require("../../conf/function");

const userSchema = new mongoose.Schema({
  full_name: String,
  username: String,
  email: String,
  password: String,
  level: String,
  created_at: String,
});

userSchema.methods.noPassword = function () {
  var obj = this.toObject();
  delete obj.password;
  Object.assign(this, obj);
  return this;
};

userSchema.methods.withToken = function () {
  var obj = this.toObject();
  delete obj.password;
  obj.token = fn.signToken({ _id: String(this._id), username: this.username });
  return obj;
};

module.exports = mongoose.model("users", userSchema, "users");
