TynApp.Chat.reply.scroll();
TynApp.Chat.reply.input();
TynApp.Chat.item();

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

function loadChat(room_id) {
  socket.emit("load-chat", getCookie("token"), room_id, (data) => {
    // console.log(data);
    for (let i in data) {
      let a = data[i];
      let message = `<div class="tyn-reply-text">${a.message}</div>`;
      if (a.user_id == getCookie("user_id"))
        $("#tynReply").prepend(
          `<div class="tyn-reply-item outgoing">
          <div class="tyn-reply-group"><div class="tyn-reply-bubble qtip tip-left" data-tip="${moment
            .unix(a.created_at)
            .format("DD-MM-YYYY HH:mm:ss")}">${message}</div></div></div>`
        );
      else
        $("#tynReply").prepend(
          `<div class="tyn-reply-item incoming">
            <div class="tyn-reply-avatar"><div class="tyn-media tyn-size-md tyn-circle">
              <img src="${WEB_HOST + "/user/avatar/" + a.user_id}" alt="" />
            </div>
          </div>
          <div class="tyn-reply-group"><div class="tyn-reply-bubble qtip tip-right" data-tip="${moment
            .unix(a.created_at)
            .format("DD-MM-YYYY HH:mm:ss")}">${message}</div></div></div>`
        );
    }
    // Cuộn xuống cuối khung chat
    let chatBody = document.querySelector("#tynChatBody");
    let height = chatBody.querySelector(".simplebar-content > *").scrollHeight;
    SimpleBar.instances.get(chatBody).getScrollElement().scrollTop = height;
  });
}
loadChat("64188ace02d75042e876384f");

socket.on("receive-chat", (room_id, user_id, message, created_at) => {
  console.log(room_id, user_id, message);
  if (user_id == getCookie("user_id")) {
    $("#tynReply").prepend(`<div class="tyn-reply-item outgoing">
      <div class="tyn-reply-group">
        <div class="tyn-reply-bubble qtip tip-left" data-tip="${moment
          .unix(created_at)
          .format("DD-MM-YYYY HH:mm:ss")}">
          <div class="tyn-reply-text">${message}</div>
        </div>
      </div>
    </div>`);
    // Cuộn xuống cuối khung chat
    let chatBody = document.querySelector("#tynChatBody");
    let height = chatBody.querySelector(".simplebar-content > *").scrollHeight;
    SimpleBar.instances.get(chatBody).getScrollElement().scrollTop = height;
  } else {
    $("#tynReply").prepend(`<div class="tyn-reply-item incoming">
      <div class="tyn-reply-avatar">
        <div class="tyn-media tyn-size-md tyn-circle">
          <img src="${WEB_HOST + "/user/avatar/" + user_id}" alt="" />
        </div>
      </div>
      <div class="tyn-reply-group">
        <div class="tyn-reply-bubble qtip tip-right" data-tip="${moment
          .unix(created_at)
          .format("DD-MM-YYYY HH:mm:ss")}">
          <div class="tyn-reply-text">${message}</div>
        </div>
      </div>
    </div>`);
  }
});
