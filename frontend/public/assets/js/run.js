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
const socket = io(WEB_HOST, { transport: ["websocket"], autoConnect: false });
if (getCookie("token")) {
  socket.auth = { token: getCookie("token") };
  socket.connect();
}
function logout() {
  var a = confirm("Bạn có muốn đăng xuất không?");
  if (a == true) {
    // localStorage.clear();
    deleteAllCookies();
    window.location.replace("./login.html");
  }
}

let isScrollBottom = false;
let isScrollTop = false;
let room_id = null;
async function openChat(_id) {
  room_id = null;
  $("#room_name").text("");
  $("#tynReply").html("");
  $("#cursor").text("");
  let password = "";
  room_id = await new Promise((resolve) => {
    socket.emit("get-info-room", _id, password, (data) => {
      if (data == false) {
      } else {
        $("#room_name").text(data.name);
        resolve(data._id);
      }
    });
  });
  loadChat(room_id);
}
function listChat() {
  socket.emit("list-chat", (data) => {
    let hasPrivate = false;
    $(".tyn-aside-list").html("");
    for (let i in data) {
      // console.log(i, data[i]);
      let a = data[i];
      if (a.privacy == "PRIVATE") hasPrivate = true;
      $(".tyn-aside-list")
        .append(`<li class="tyn-aside-item js-toggle-main" onclick="openChat('${a._id}')">
          <div class="tyn-media-group">
            <div class="tyn-media tyn-size-lg">
              <img src="images/avatar/1.jpg" alt="" />
            </div>
            <div class="tyn-media-col">
              <div class="tyn-media-row">
                <h6 class="name">${a.name}</h6>
                <span class="typing">${a.privacy}</span>
              </div>
              <div class="tyn-media-row has-dot-sap">
                <p class="content">bla bla.</p>
                <span class="meta">now</span>
              </div>
            </div>
          </div>
        </li>`);
    }
    if (hasPrivate) $("#leave-stranger").show();
    else {
      socket.emit("searching-stranger", (data) => {
        if (data) $("#searching-stranger").show();
        else $("#search-stranger").show();
      });
    }
  });
}
function loadMessage(
  user_id,
  full_name,
  username,
  message,
  created_at,
  pos = "append"
) {
  message = `<div class="tyn-reply-text">${message.replace(
    /\n/g,
    "<br/>"
  )}</div>`;
  created_at = moment.unix(created_at).format("DD-MM-YYYY HH:mm:ss");
  let content = "";
  if (user_id == getCookie("user_id") || user_id == md5(getCookie("user_id"))) {
    content = `<div class="tyn-reply-item outgoing">
          <div class="tyn-reply-group"><div class="tyn-reply-bubble qtip tip-left" data-tip="${created_at}">${message}</div></div></div>`;
  } else {
    content = `<div class="tyn-reply-item incoming">
            <div class="tyn-reply-avatar"><div class="tyn-media tyn-size-md tyn-circle qtip tip-right"
              data-tip="${full_name + "\n@" + username}">
              <img src="${
                WEB_HOST + "/user/avatar/" + user_id
              }" alt="user avatar" />
            </div>
          </div>
          <div class="tyn-reply-group"><div class="tyn-reply-bubble qtip tip-right" data-tip="${created_at}">${message}</div></div></div>`;
  }
  if (pos == "append") $("#tynReply").append(content);
  else if (pos == "prepend") $("#tynReply").prepend(content);
}
function loadChat(room_id, cursor = null, isScroll = true) {
  if (room_id)
    socket.emit("load-chat", room_id, cursor, (data) => {
      // console.log(data);
      for (let i in data) {
        let a = data[i];
        $("#cursor").text(a.created_at);
        loadMessage(
          a.user_id,
          a.user.full_name,
          a.user.username,
          a.message,
          a.created_at
        );
      }
      if (isScroll) scrollBot();
    });
}
socket.on(
  "receive-chat",
  (r_id, { user_id, full_name, username }, message, created_at) => {
    console.log(r_id, user_id, message);
    if (room_id == r_id)
      try {
        loadMessage(
          user_id,
          full_name,
          username,
          message,
          created_at,
          "prepend"
        );
        if (
          user_id == getCookie("user_id") ||
          user_id == md5(getCookie("user_id"))
        )
          scrollBot();
        else {
          if (isScrollBottom) scrollBot();
        }
      } catch (err) {}
  }
);
function searchStranger() {
  socket.emit("search-stranger", (data) => {
    if (data != false) {
      if (data.status == "searching") {
        $("#search-stranger").hide();
        $("#searching-stranger").show();
        $("#leave-stranger").hide();
        $.notify("Đang tìm kiếm...", "info");
      } else if (data.status == "matching") {
        $("#search-stranger").hide();
        $("#searching-stranger").hide();
        $("#leave-stranger").show();
        $.notify("Đang kết nối...", "success");
        listChat();
      }
    } else $.notify("Có lỗi xảy ra, vui lòng thử lại!", "error");
  });
}
function searchingStranger() {
  socket.emit("cancel-searching-stranger", (data) => {
    if (data != false) {
      $("#search-stranger").show();
      $("#searching-stranger").hide();
      $("#leave-stranger").hide();
      $.notify("Đã huỷ tìm kiếm!", "success");
    } else {
      // Lỗi kỹ thuật, nhưng tạm chưa sửa
      $("#search-stranger").hide();
      $("#searching-stranger").show();
      $("#leave-stranger").hide();
      $.notify("Có lỗi xảy ra, vui lòng thử lại!", "error");
    }
  });
}
function leaveStranger() {
  socket.emit("leave-stranger", (data) => {
    if (data) {
      $("#search-stranger").show();
      $("#searching-stranger").hide();
      $("#leave-stranger").hide();
      $.notify("Đã kết thúc trò chuyện!", "success");
      listChat();
    } else $.notify("Có lỗi xảy ra, vui lòng thử lại!", "error");
  });
}
socket.on("matching-stranger", () => {
  $("#search-stranger").hide();
  $("#searching-stranger").hide();
  $("#leave-stranger").show();
  $.notify("Đã kết nối với đối phương!", "success");
  listChat();
});
socket.on("leave-stranger", () => {
  $("#search-stranger").show();
  $("#searching-stranger").hide();
  $("#leave-stranger").hide();
  $.notify("Đối phương đã kết thúc trò chuyện với bạn. :(", "warning");
  listChat();
});
