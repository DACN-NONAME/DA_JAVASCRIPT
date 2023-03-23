socket.emit("get-profile", (a) => {
  console.log(a);
  $("#user-avatar").attr("src", WEB_HOST + "/user/avatar/" + a._id);
  $("#fullname").text(a.full_name + " ");
  $(".username").text("@" + a.username);
  $("#full_name").val(a.full_name);
  $("#username").val(a.username);
  $("#email").val(a.email);
  $("#created_at").val(moment.unix(a.created_at).format("DD-MM-YYYY HH:mm:ss"));
});

$("#update-profile").on("click", function () {
  $.ajax({
    url: WEB_HOST + "/user/me",
    type: "post",
    data: { full_name: $("#full_name").val() },
    headers: {
      Authorization: "Bearer " + getCookie("token"),
    },
    success: function (data) {
      if (data.success) $.notify("Cập nhật thành công!", "success");
      else $.notify("Cập nhật thất bại!", "error");
    },
  });
});
$("#update-password").on("click", function () {
  $.ajax({
    url: WEB_HOST + "/user/password",
    type: "post",
    data: {
      password: $("#password").val(),
      new_password: $("#new-password").val(),
      new_password_again: $("#new-password-again").val(),
    },
    headers: {
      Authorization: "Bearer " + getCookie("token"),
    },
    success: function (data) {
      if (data.success) {
        $("#password").val("");
        $("#new-password").val("");
        $("#new-password-again").val("");
        $.notify("Cập nhật mật khẩu thành công!", "success");
      } else $.notify(data.message, "error");
    },
  });
});
