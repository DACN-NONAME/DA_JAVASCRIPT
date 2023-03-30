const axios = require("axios");
const mongoose = require("mongoose");
const striptags = require("striptags");
var moment = require("moment-timezone");
moment().tz("Asia/Ho_Chi_Minh").format();

const dbUsers = mongoose.model("users");
const dbRooms = mongoose.model("rooms");
const dbMessages = mongoose.model("messages");

const userController = require("./user.controller");
const ReturnData = require("../models/returnData.model");
const fn = require("../../conf/function");

async function webhookTelegram(req, res) {
  let returnData = new ReturnData();
  //   console.log(req.body);
  try {
    let { message } = req.body;
    if (message.from.is_bot == false) {
      let chat_id = message.chat.id;
      let api =
        "https://api.telegram.org/bot" +
        process.env.TELEGRAM_TOKEN +
        "/sendmessage?chat_id=" +
        chat_id +
        "&text=";
      //   console.log(api + encodeURI("Chào."));
      let text = "";
      let cmd = message.text.split(" ");
      switch (cmd[0].toLowerCase()) {
        case "/hi":
        case "/hello":
          await axios.get(api + encodeURIComponent("Rất xin chào."));
          break;

        case "/stats":
          text = "📊 Thống kê Chat:";
          text += "\nTổng người dùng: " + (await dbUsers.countDocuments({}));
          text +=
            "\nTổng phòng PUBLIC: " +
            (await dbRooms.countDocuments({ privacy: "PUBLIC" }));
          text +=
            "\nTổng phòng PRIVATE: " +
            (await dbRooms.countDocuments({ privacy: "PRIVATE" }));
          text +=
            "\nTổng người dùng đang online: " + global._io.of("/").sockets.size;
          await axios.get(api + encodeURIComponent(text));
          break;

        case "/user":
          text = "Không tìm thấy người dùng!";
          let user = null;
          if (cmd[1]) user = await userController.getUser(cmd[1].toLowerCase());
          if (user) {
            text = "👤 Thông tin người dùng:";
            text += "\n" + user.full_name;
            text += "\n@" + user.username;
            text += "\n" + user.email;
            text +=
              "\nNgày tham gia: " +
              moment.unix(user.created_at).format("DD-MM-YYYY HH:mm:ss");
          }
          await axios.get(api + encodeURIComponent(text));
          break;

        case "/rooms":
          text = "Danh sách phòng PUBLIC hiện có (ID, tên):";
          let rooms = await dbRooms.find({ privacy: "PUBLIC" });
          for (let i in rooms) {
            let a = rooms[i];
            text += "\n" + a._id + ": " + a.name;
          }
          await axios.get(api + encodeURIComponent(text));
          break;

        case "/room-add":
          text =
            "Lệnh dùng để tạo một room public!\nUsage: /room-add <tên room>";
          let room_name = message.text.replace("/room-add ", "");
          if (room_name) {
            await new dbRooms({
              name: room_name,
              privacy: "PUBLIC",
              password: "",
              created_at: moment().unix(),
            }).save();
            text = "Đã tạo phòng!";
          }
          await axios.get(api + encodeURIComponent(text));
          break;

        case "/room-del":
          text =
            "Lệnh dùng để xoá một room public!\nUsage: /room-del <id_room>";
          if (cmd[1]) {
            await dbRooms.deleteOne({ _id: cmd[1] });
            text = "Đã xoá phòng!";
          }
          await axios.get(api + encodeURIComponent(text));
          break;

        case "/ads":
          text = "Vui lòng nhập nội dung cần quảng bá!";
          if (cmd[1]) {
            let user = await dbUsers.findOne({
              _id: "641c8ff1b56d8b5c3ca910ef",
            });
            let rooms = await dbRooms.find({ privacy: "PUBLIC" });
            message = message.text.replace("/ads ", "").trim();
            let created_at = moment().unix();
            for (let i in rooms) {
              let room = rooms[i];
              new dbMessages({
                room_id: room._id,
                user_id: user._id,
                message,
                created_at,
              }).save();
              global._io.emit(
                "receive-chat",
                room._id,
                {
                  user_id: String(user._id),
                  full_name: user.full_name,
                  username: user.username,
                },
                message,
                created_at
              );
            }
            text = "Đã gửi nội dung!";
          }
          await axios.get(api + encodeURIComponent(text));
          break;

        default:
          break;
      }
    }
  } catch (err) {
    console.log("Có lỗi rồi đại vương ơi:", err);
  }
  res.send(returnData.toObject());
}

module.exports = { webhookTelegram };
