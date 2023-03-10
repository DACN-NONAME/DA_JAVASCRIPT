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

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
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

io.on("connection", function (socket) {
  socket.on("disconnect", () => {});
});

server.listen(serverPort, () => {
  console.log("listening on *:" + serverPort);
});
