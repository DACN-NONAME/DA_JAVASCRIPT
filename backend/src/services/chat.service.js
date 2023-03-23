const mongoose = require("mongoose");
var moment = require("moment-timezone");
moment().tz("Asia/Ho_Chi_Minh").format();

const dbRooms = require("../models/room.model");
const dbRoomParticipants = require("../models/room_participant.model");
const dbWaiting = require("../models/waiting.model");
const dbMessages = require("../models/message.model");
const userController = require("../controllers/user.controller");

const fn = require("../../conf/function");

const mapUsers = new Map();
const mapPrivateRooms = new Map();

String.prototype.toHtmlEntities = function () {
  return this.replace(/./gm, function (s) {
    // return "&#" + s.charCodeAt(0) + ";";
    return s.match(/[a-z0-9\s]+/i) ? s : "&#" + s.charCodeAt(0) + ";";
  });
};

class Chat {
  // prepare socket
  async ready(socket, next) {
    let room = await dbRoomParticipants.findOne({ user_id: socket.user_id });
    if (room) {
      mapPrivateRooms.set(socket.id, String(room.room_id));
      socket.join(String(room.room_id));
    }
    next();
  }

  //connection socket
  connection(socket) {
    socket.on("connect", () => {
      // mapUsers.set(parse.username, socket.id);
      console.log(`User connect id is: ${socket.id}`);
    });

    socket.on("disconnect", () => {
      // mapUsers.delete(parse.username);
      console.log(`User disconnect id is: ${socket.id}`);
    });

    socket.on("check-session", (callback) => {
      callback(fn.checkSession(socket.token));
    });

    socket.on("get-profile", async (callback) => {
      let parse = fn.verifyToken(socket.token);
      let user = await userController.getUser(parse.username);
      user.password = undefined;
      callback(user);
    });

    socket.on("get-info-room", async (room_id, password, callback) => {
      let room = await dbRooms.findOne({ _id: room_id });
      if (room) callback(room);
      else callback(false);
    });

    socket.on("search-stranger", async (callback) => {
      let exist = await dbRoomParticipants.findOne({ user_id: socket.user_id });
      if (exist == null) {
        let stranger = await dbWaiting.findOne({});
        if (stranger) {
          let session = await mongoose.startSession();
          session.startTransaction();
          try {
            let opts = { session, returnOriginal: false };
            // Tạo phòng riêng
            let room = await new dbRooms({
              name: "Ẩn danh",
              privacy: "PRIVATE",
              password: "",
              created_at: moment().unix(),
            }).save(opts);
            // Tạo 2 người tham gia
            await new dbRoomParticipants({
              room_id: room._id,
              user_id: stranger.user_id,
            }).save(opts);
            await new dbRoomParticipants({
              room_id: room._id,
              user_id: socket.user_id,
            }).save(opts);
            // Xoá người lạ khỏi hàng chờ
            await dbWaiting.deleteOne({ user_id: stranger.user_id }, opts);
            await session.commitTransaction();
            // Thêm vào socket room
            mapPrivateRooms.set(socket.id, String(room._id));
            socket.join(String(room._id));
            callback({ status: "matching" });
            // Thêm người lạ và socket room
            for (let [id, sk] of global._io.of("/").sockets) {
              if (sk.user_id == stranger.user_id) {
                sk.join(String(room._id));
                sk.emit("matching-stranger");
                mapPrivateRooms.set(sk.id, String(room._id));
                break;
              }
            }
          } catch (err) {
            await session.abortTransaction();
            console.log("Error Transaction:", err);
            callback(false);
          }
        } else {
          await new dbWaiting({
            user_id: socket.user_id,
            created_at: moment().unix(),
          }).save();
          callback({ status: "searching" });
        }
      } else callback(false);
    });

    socket.on("searching-stranger", async (callback) => {
      let exist = await dbWaiting.findOne({ user_id: socket.user_id });
      if (exist) callback(true);
      else callback(false);
    });

    socket.on("cancel-searching-stranger", async (callback) => {
      let exist = await dbWaiting.findOne({ user_id: socket.user_id });
      if (exist) {
        await dbWaiting.deleteOne({ user_id: exist.user_id });
        callback(true);
      } else callback(false);
    });

    socket.on("leave-stranger", async (callback) => {
      let exist = await dbRoomParticipants.findOne({ user_id: socket.user_id });
      if (exist) {
        let session = await mongoose.startSession();
        session.startTransaction();
        try {
          let opts = { session, returnOriginal: false };
          // Xoá phòng riêng, 2 người tham gia
          await dbRooms.deleteOne({ _id: exist.room_id }, opts);
          await dbRoomParticipants.deleteMany({ room_id: exist.room_id }, opts);
          await dbMessages.deleteMany({ room_id: exist.room_id }, opts);
          await session.commitTransaction();
          // Xoá người hiện tại khỏi socket room
          let room_id = mapPrivateRooms.get(socket.id);
          socket.leave(room_id);
          mapPrivateRooms.delete(socket.id);
          // Xoá người lạ khỏi socket room
          for (let [id, sk] of global._io.of("/").sockets) {
            if (mapPrivateRooms.get(id) == room_id) {
              sk.leave(room_id);
              sk.emit("leave-stranger");
              mapPrivateRooms.delete(id);
              break;
            }
          }
          callback(true);
        } catch (err) {
          await session.abortTransaction();
          console.log("Error Transaction:", err);
          callback(false);
        }
      } else callback(false);
    });

    socket.on("list-chat", async (callback) => {
      let rooms = await dbRooms.find({ privacy: "PUBLIC" });
      let room = await dbRooms.findOne({ _id: mapPrivateRooms.get(socket.id) });
      if (room) rooms = [...rooms, room];
      callback(rooms);
    });

    socket.on("load-chat", async (room_id, cursor, callback) => {
      let room = await dbRooms.findOne({ _id: room_id });
      let filter = { room_id };
      if (cursor) filter.created_at = { $lt: cursor };
      let data = await dbMessages
        .find(filter)
        .sort({ created_at: "desc" })
        .limit(20)
        .populate("user", "full_name username");
      let data2 = [];
      if (room.privacy == "PRIVATE") {
        // data = data.toObject();
        for (let i in data) {
          let obj = data[i].toObject();
          obj.user_id = fn.hashMD5(String(obj.user_id));
          obj.user._id = undefined;
          obj.user.full_name = "Ẩn danh";
          obj.user.username = "null";
          data2 = [...data2, obj];
        }
      } else data2 = [...data];
      callback(data2);
    });

    socket.on("send-chat", async (room_id, message) => {
      let room = await dbRooms.findOne({ _id: room_id });
      if (room) {
        let parse = fn.verifyToken(socket.token);
        message = fn.escapeHtml(message.trim().replace(/<br>/g, "\n"));
        let user_id = parse._id;
        let created_at = moment().unix();
        new dbMessages({
          room_id,
          user_id,
          message,
          created_at,
        }).save();
        let user = await userController.getUser(parse.username);
        console.log(socket.id, mapPrivateRooms.get(socket.id));
        if (room.privacy == "PUBLIC")
          global._io.emit(
            "receive-chat",
            room_id,
            {
              user_id,
              full_name: user.full_name,
              username: user.username,
            },
            message,
            created_at
          );
        else if (room.privacy == "PRIVATE")
          global._io.to(mapPrivateRooms.get(socket.id)).emit(
            "receive-chat",
            room_id,
            {
              user_id: fn.hashMD5(user_id),
              full_name: "Ẩn danh",
              username: "null",
            },
            message,
            created_at
          );
      }
    });
  }
}
module.exports = new Chat();
