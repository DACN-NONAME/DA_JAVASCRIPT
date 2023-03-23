require("dotenv").config();
// const socket = require('socket.io-client')('http://194.233.75.28:3007');
const express = require("express");
var cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
var server = require("http").Server(app);
var axios = require("axios");

function CHECK_SESSION(req, res) {
  console.log(req.cookies);
  // socket.emit('check-session', req.cookies.uid, req.cookies.token, (a) => {
  // 	if (!a) res.redirect('/login.html');
  // 	else res.sendFile(path.join(__dirname, 'build', 'index.html'));
  // });
}
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build"), { index: false }));

app.get("/*", async function (req, res) {
  // CHECK_SESSION(req, res);
  let data;
  try {
    data = await axios.get("http://194.233.75.28:3007/user/check-session", {
      headers: { Authorization: `Bearer ${req.cookies.token}` },
    });
    data = data.data;
  } catch (err) {
    data = err.response.data;
  }
  if (data.success == false) res.redirect("/login.html");
  else res.sendFile(path.join(__dirname, "build", "index.html"));
});

console.log("OK.");
server.listen(process.env.PORT); // SET PORT
