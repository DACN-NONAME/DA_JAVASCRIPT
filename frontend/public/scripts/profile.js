socket.emit("get-profile", getCookie("token"), (a) => {
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
