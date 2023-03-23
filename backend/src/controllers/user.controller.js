const axios = require("axios");
const mongoose = require("mongoose");
const striptags = require("striptags");
var moment = require("moment-timezone");
moment().tz("Asia/Ho_Chi_Minh").format();

const dbUsers = mongoose.model("users");

const ReturnData = require("../models/returnData.model");
const fn = require("../../conf/function");

function checkSession(req, res) {
  let returnData = new ReturnData();
  returnData.success = true;
  returnData.message = "Phiên hợp lệ!";
  res.send(returnData.toObject());
}

async function getUserById(_id) {
  try {
    let user = await dbUsers.findOne({ _id });
    if (user != null) return user;
    else return false;
  } catch (err) {
    return false;
  }
}

async function getUser(username) {
  let user = await dbUsers.findOne({
    $or: [{ username }, { email: username }],
  });
  if (user != null) return user;
  else return false;
}

async function login(req, res) {
  let returnData = new ReturnData();
  let { username, password } = req.body;
  let user = await getUser(username);
  if (user != false)
    if (fn.bcryptVerify(password, user.password)) {
      returnData.success = true;
      returnData.data = user.withToken();
    } else returnData.message = "Mật khẩu không chính xác!";
  else returnData.message = "Tài khoản không tồn tại!";
  res.send(returnData.toObject());
}

async function register(req, res) {
  let returnData = new ReturnData();
  let user = new dbUsers(req.body);

  if (!user.full_name) {
    returnData.message = "Vui lòng nhập họ tên!";
    res.send(returnData.toObject());
    return;
  }
  if (
    !user.username ||
    /^[0-9]+?$/.test(user.username) ||
    !/^[a-zA-Z0-9._]+?$/.test(user.username) ||
    user.username.length <= 5
  ) {
    returnData.message =
      "Vui lòng nhập tên người dùng hợp lệ và tối thiểu 5 ký tự!";
    res.send(returnData.toObject());
    return;
  }
  if (
    !user.email ||
    !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
      user.email
    )
  ) {
    returnData.message = "Vui lòng nhập email hợp lệ!";
    res.send(returnData.toObject());
    return;
  }
  if (!user.password) {
    returnData.message = "Vui lòng nhập mật khẩu!";
    res.send(returnData.toObject());
    return;
  }

  user.username = user.username.toLowerCase();
  user.email = user.email.toLowerCase();
  let temp_user_a = await getUser(user.username);
  let temp_user_b = await getUser(user.email);
  if (temp_user_a == false && temp_user_b == false) {
    user.full_name = striptags(user.full_name);
    user.password = fn.bcryptHash(user.password);
    user.created_at = moment().unix();

    let result = await user.save();
    if (result) {
      returnData.success = true;
      returnData.data = result.withToken();
    } else returnData.message = err.message;
  } else returnData.message = "Tài khoản đã tồn tại với username hoặc email!";

  res.send(returnData.toObject());
}

async function getMe(req, res) {
  let returnData = new ReturnData();
  let user = await getUser(req.username);
  if (user) {
    returnData.success = true;
    user.password = undefined;
    returnData.data = user;
  } else returnData.message = "Người dùng không tìm thấy!";
  res.send(returnData.toObject());
}

async function updateMe(req, res) {
  let returnData = new ReturnData();
  let user = await getUser(req.username);
  if (user) {
    let { full_name } = req.body;
    if (!full_name) returnData.message = "Vui lòng nhập họ tên!";
    else {
      full_name = striptags(full_name);
      let result = await dbUsers.updateOne(
        { username: req.username },
        { full_name }
      );
      if (result) {
        returnData.success = true;
        returnData.message = "Cập nhật thông tin thành công!";
      } else returnData.message = "Không thể cập nhật thông tin!";
    }
  } else returnData.message = "Người dùng không tìm thấy!";
  res.send(returnData.toObject());
}

async function getAvatar(req, res) {
  let { user_id } = req.params;
  let user = await getUserById(user_id);
  // console.log(user);
  if (user == false) {
    res.redirect(
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    );
  } else {
    let avatar =
      "https://gravatar.com/avatar/" +
      fn.hashMD5(user.email) +
      "?s=200&d=identicon";
    res.redirect(avatar);
    // axios
    //   .get(avatar)
    //   .then(function (data) {
    //     res.redirect(avatar);
    //   })
    //   .catch(function (error) {
    //     res.redirect(
    //       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    //     );
    //   });
  }
}

async function updatePassword(req, res) {
  let returnData = new ReturnData();
  let user = await getUser(req.username);
  if (user) {
    let { password, new_password, new_password_again } = req.body;
    if (!password) returnData.message = "Vui lòng nhập mật khẩu cũ!";
    else if (!new_password) returnData.message = "Vui lòng nhập mật khẩu mới!";
    else if (!new_password_again)
      returnData.message = "Vui lòng nhập mật khẩu mới lần nữa!";
    else if (new_password != new_password_again)
      returnData.message = "Mật khẩu mới và nhập lại không trùng khớp!";
    else {
      if (fn.bcryptVerify(password, user.password)) {
        let result = await dbUsers.updateOne(
          { username: req.username },
          { password: fn.bcryptHash(new_password) }
        );
        if (result) {
          returnData.success = true;
          returnData.message = "Cập nhật mật khẩu thành công!";
        } else returnData.message = "Không thể cập nhật mật khẩu!";
      } else returnData.message = "Mật khẩu cũ không chính xác!";
    }
  } else returnData.message = "Người dùng không tìm thấy!";
  res.send(returnData.toObject());
}

module.exports = {
  checkSession,
  getUser,
  login,
  register,
  getMe,
  updateMe,
  getAvatar,
  updatePassword,
};
