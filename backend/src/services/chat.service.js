var moment = require("moment-timezone");
moment().tz("Asia/Ho_Chi_Minh").format();

const dbRooms = require("../models/room.model");
const dbMessages = require("../models/message.model");
const userController = require("../controllers/user.controller");

const fn = require("../../conf/function");

String.prototype.toHtmlEntities = function () {
  return this.replace(/./gm, function (s) {
    // return "&#" + s.charCodeAt(0) + ";";
    return s.match(/[a-z0-9\s]+/i) ? s : "&#" + s.charCodeAt(0) + ";";
  });
};

class Chat {
  //connection socket
  connection(socket) {
    socket.on("disconnect", () => {
      console.log(`User disconnect id is ${socket.id}`);
    });

    socket.on("check-session", (token, callback) => {
      callback(fn.checkSession(token));
    });

    socket.on("get-profile", async (token, callback) => {
      if (fn.checkSession(token)) {
        let parse = fn.verifyToken(token);
        let user = await userController.getUser(parse.username);
        user.password = undefined;
        callback(user);
      }
    });

    socket.on("load-chat", async (token, room_id, cursor, callback) => {
      if (fn.checkSession(token)) {
        let filter = { room_id };
        if (cursor) filter.created_at = { $lt: cursor };
        let data = await dbMessages
          .find(filter)
          .sort({ created_at: "desc" })
          .limit(10)
          .populate("user", "full_name username");
        // console.log(data);
        callback(data);
      }
    });

    socket.on("send-chat", async (token, room_id, message) => {
      if (fn.checkSession(token)) {
        let room = await dbRooms.findOne({ _id: room_id });
        if (room) {
          let parse = fn.verifyToken(token);
          message = message.trim().replace(/<br>/g, "\n").toHtmlEntities();
          let created_at = moment().unix();
          new dbMessages({
            room_id,
            user_id: parse._id,
            message,
            created_at,
          }).save();
          let user = await userController.getUser(parse.username);
          global._io.emit(
            "receive-chat",
            room_id,
            {
              user_id: String(parse._id),
              full_name: user.full_name,
              username: user.username,
            },
            message,
            created_at
          );
        }
      }
    });
  }
}
module.exports = new Chat();
