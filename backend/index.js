require("dotenv").config();
const axios = require("axios");
var moment = require("moment-timezone");
moment().tz("Asia/Ho_Chi_Minh").format();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
var app = require("express")();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const fn = require("./conf/function");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const connectDB = require("./conf/database");
connectDB();

let index = require("./src/routes/index");

const serverHost = "localhost";
const serverPort = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/", index);

var server = require("http").createServer(app);
var io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["*"] },
});
global._io = io;

const chatService = require("./src/services/chat.service");

global._io.use((socket, next) => {
  let token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Invalid token."));
  } else {
    if (fn.checkSession(token)) {
      let parse = fn.verifyToken(token);
      socket.user_id = parse._id;
      // socket.user_name = parse.user_name;
      socket.token = token;
    } else return next(new Error("Invalid token."));
  }
  next();
});
global._io.use(chatService.ready);
global._io.on("connection", chatService.connection);

server.listen(serverPort, () => {
  console.log("listening on *:" + serverPort);
});
