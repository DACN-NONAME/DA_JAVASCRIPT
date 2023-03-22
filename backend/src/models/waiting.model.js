"use strict";
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const roomSchema = new mongoose.Schema({
  user_id: ObjectId,
  created_at: String,
});

roomSchema.methods.noPassword = function () {
  var obj = this.toObject();
  delete obj.password;
  Object.assign(this, obj);
  return this;
};

module.exports = mongoose.model("waiting", roomSchema, "waiting");
