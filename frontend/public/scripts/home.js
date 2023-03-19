TynApp.Chat.reply.scroll();
TynApp.Chat.reply.input();
TynApp.Chat.item();

let editableDiv = document.querySelector('div[contenteditable="true"]');
editableDiv.addEventListener("paste", function (e) {
  e.preventDefault();
  var text = e.clipboardData.getData("text/plain");
  // console.log({ text });
  // console.log({ text: text.replace(/\r\n/g, "<br>") });
  // document.execCommand("insertHTML", false, text);
  text = $("#tynChatInput").html() + text.replace(/\r\n/g, "<br>");
  $("#tynChatInput").html(text);
});

$("#tynChatInput").on("keydown", function search(e) {
  if (e.keyCode == 13) {
    let text = $(this).html();
    if (text != "") {
      if (!e.shiftKey) {
        e.preventDefault();
        if (
          $(".tyn-reply-item:first-child").attr("class").includes("outgoing")
        ) {
          $(".tyn-reply-group:first-child").append(
            `<div class="tyn-reply-bubble"><div class="tyn-reply-text">${text}</div></div>`
          );
          let chatBody = document.querySelector("#tynChatBody");
          let height = chatBody.querySelector(
            ".simplebar-content > *"
          ).scrollHeight;
          SimpleBar.instances.get(chatBody).getScrollElement().scrollTop =
            height;
        }
        $(this).html("");
      }
    } else e.preventDefault();
  }
});
