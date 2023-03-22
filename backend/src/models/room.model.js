"use strict";
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: String,
  privacy: String,
  password: String,
  created_at: String,
});

roomSchema.methods.noPassword = function () {
  var obj = this.toObject();
  delete obj.password;
  Object.assign(this, obj);
  return this;
};

module.exports = mongoose.model("rooms", roomSchema);
