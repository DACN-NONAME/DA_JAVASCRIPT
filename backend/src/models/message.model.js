"use strict";
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema = new mongoose.Schema({
  room_id: ObjectId,
  user_id: ObjectId,
  message: String,
  created_at: String,
});

messageSchema.virtual("user", {
  ref: "users",
  localField: "user_id",
  foreignField: "_id",
  justOne: true,
});
// tell Mongoose to retreive the virtual fields
messageSchema.set("toObject", { virtuals: true });
messageSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("messages", messageSchema);
