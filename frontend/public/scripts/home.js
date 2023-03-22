TynApp.Chat.reply.scroll();
TynApp.Chat.reply.input();
TynApp.Chat.item();

var isScrollBottom = false;
var isScrollTop = false;

var editableDiv = document.querySelector('div[contenteditable="true"]');
editableDiv.addEventListener("paste", function (e) {
  e.preventDefault();
  var text = e.clipboardData.getData("text/plain");
  // console.log({ text });
  // console.log({ text: text.replace(/\r\n/g, "<br>") });
  // document.execCommand("insertHTML", false, text);
  text = $("#tynChatInput").html() + text.replace(/\r\n/g, "<br/>");
  $("#tynChatInput").html(text);
});

// Cuộn xuống cuối khung chat
var chatBody = document.querySelector("#tynChatBody");
function scrollBot() {
  let height = chatBody.querySelector(".simplebar-content > *").scrollHeight;
  SimpleBar.instances.get(chatBody).getScrollElement().scrollTop = height;
}
SimpleBar.instances
  .get(chatBody)
  .getScrollElement()
  .addEventListener("scroll", scrollHandler, { passive: true });
async function scrollHandler(event) {
  for (;;) {
    const { scrollHeight, scrollTop, clientHeight } = event.target;
    const isBottomReached =
      scrollHeight - Math.round(scrollTop) === clientHeight;
    if (isBottomReached) {
      // console.log("bot.");
      isScrollTop = false;
      isScrollBottom = true;
      await wait(500);
    } else if (scrollTop === 0) {
      isScrollTop = true;
      isScrollBottom = false;
      loadChat("64188ace02d75042e876384f", $("#cursor").text(), false);
      break;
    } else {
      isScrollTop = false;
      isScrollBottom = false;
      break;
    }
  }
}

$("#tynChatInput").on("keydown", function search(e) {
  if (e.keyCode == 13) {
    let text = $(this).html();
    if (text != "") {
      if (!e.shiftKey) {
        e.preventDefault();
        socket.emit(
          "send-chat",
          getCookie("token"),
          "64188ace02d75042e876384f",
          text
        );
        // Xoá text
        $(this).html("");
      }
    } else e.preventDefault();
  }
});

function loadChat(room_id, cursor = $("#cursor").text(), isScroll = true) {
  socket.emit("load-chat", getCookie("token"), room_id, cursor, (data) => {
    // console.log(data);
    for (let i in data) {
      let a = data[i];
      $("#cursor").text(a.created_at);
      let message = `<div class="tyn-reply-text">${a.message.replace(
        /\n/g,
        "<br/>"
      )}</div>`;
      let created_at = moment.unix(a.created_at).format("DD-MM-YYYY HH:mm:ss");
      if (a.user_id == getCookie("user_id"))
        $("#tynReply").append(
          `<div class="tyn-reply-item outgoing">
          <div class="tyn-reply-group"><div class="tyn-reply-bubble qtip tip-left" data-tip="${created_at}">${message}</div></div></div>`
        );
      else
        $("#tynReply").append(
          `<div class="tyn-reply-item incoming">
            <div class="tyn-reply-avatar"><div class="tyn-media tyn-size-md tyn-circle qtip tip-right"
              data-tip="${a.user.full_name + "\n@" + a.user.username}">
              <img src="${
                WEB_HOST + "/user/avatar/" + a.user_id
              }" alt="user avatar" />
            </div>
          </div>
          <div class="tyn-reply-group"><div class="tyn-reply-bubble qtip tip-right" data-tip="${created_at}">${message}</div></div></div>`
        );
    }
    if (isScroll) scrollBot();
  });
}
loadChat("64188ace02d75042e876384f");

socket.on(
  "receive-chat",
  (room_id, { user_id, full_name, username }, message, created_at) => {
    console.log(room_id, user_id, message);
    message = message.replace(/\n/g, "<br/>");
    created_at = moment.unix(created_at).format("DD-MM-YYYY HH:mm:ss");
    if (user_id == getCookie("user_id")) {
      $("#tynReply").prepend(`<div class="tyn-reply-item outgoing">
      <div class="tyn-reply-group">
        <div class="tyn-reply-bubble qtip tip-left" data-tip="${created_at}">
          <div class="tyn-reply-text">${message}</div>
        </div>
      </div>
    </div>`);
      scrollBot();
    } else {
      $("#tynReply").prepend(`<div class="tyn-reply-item incoming">
      <div class="tyn-reply-avatar">
        <div class="tyn-media tyn-size-md tyn-circle qtip tip-right"
          data-tip="${full_name + "\n@" + username}">
          <img src="${
            WEB_HOST + "/user/avatar/" + user_id
          }" alt="user avatar" />
        </div>
      </div>
      <div class="tyn-reply-group">
        <div class="tyn-reply-bubble qtip tip-right" data-tip="${created_at}">
          <div class="tyn-reply-text">${message}</div>
        </div>
      </div>
    </div>`);
      if (isScrollBottom) scrollBot();
    }
  }
);
