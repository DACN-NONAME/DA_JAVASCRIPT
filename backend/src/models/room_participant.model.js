"use strict";
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const roomParticipantSchema = new mongoose.Schema({
  room_id: ObjectId,
  user_id: ObjectId,
});

module.exports = mongoose.model("room_participants", roomParticipantSchema);
