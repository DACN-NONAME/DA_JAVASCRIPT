TynApp.Chat.reply.scroll();
TynApp.Chat.reply.input();
TynApp.Chat.item();

room_id = null;

var editableDiv = document.querySelector('div[contenteditable="true"]');
editableDiv.addEventListener("paste", function (e) {
  e.preventDefault();
  let text = e.clipboardData.getData("text/plain");
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
      loadChat(room_id, $("#cursor").text(), false);
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
        if (room_id) socket.emit("send-chat", room_id, text);
        // Xoá text
        $(this).html("");
      }
    } else e.preventDefault();
  }
});

listChat();
