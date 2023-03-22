"use strict";

function getChanges(key) {
  if (!key) {
    console.log(key, ", Error: No value specified");
    return;
  }
  return localStorage.getItem(key);
}
function saveChanges(key, value) {
  if (!value) {
    console.log(key, ", Error: No value specified");
    return;
  } else {
    localStorage.setItem(key, value);
  }
}
function removeChanges(key) {
  if (!key) {
    console.log(key, ", Error: No value specified");
    return;
  } else {
    localStorage.removeItem(key);
  }
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const WEB_HOST = `http://localhost:3000`;
setCookie("web_host", WEB_HOST, 365);
const socket = io(WEB_HOST, { transport: ["websocket"] });
// function check_server() {
//     var a = socket.connected;
//     socket.emit('check-session', getCookie('uid'), getCookie('token'), (a) => {
//         if (a == false) { localStorage.clear(); var s = getCookie('settings'); deleteAllCookies(); setCookie('settings', s, 365); if (!window.location.pathname.includes('login')) window.location.replace("/login.html"); }
//         else { if (window.location.pathname.includes('login')) window.location.replace("/home"); else check_server(); }
//     });
//     return a;
// } check_server();
function logout() {
  var a = confirm("Bạn có muốn đăng xuất không?");
  if (a == true) {
    // localStorage.clear();
    deleteAllCookies();
    window.location.replace("./login.html");
  }
}
