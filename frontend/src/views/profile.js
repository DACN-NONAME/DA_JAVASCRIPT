/* eslint-disable */
import React from "react";

function App() {
  return (
    <div className="tyn-content  tyn-content-page">
      <div className="tyn-main tyn-content-inner" id="tynMain">
        <div className="container">
          <div className="tyn-profile">
            <div className="tyn-profile-head">
              <div className="tyn-profile-cover">
                <img
                  className="tyn-profile-cover-image"
                  src="images/cover/1.jpg"
                  alt=""
                />
              </div>
              <div className="tyn-profile-info">
                <div className="tyn-media-group align-items-start">
                  <div className="tyn-media tyn-media-bordered tyn-size-4xl tyn-profile-avatar">
                    <img id="user-avatar" src="" alt="user avatar" />
                  </div>
                  <div className="tyn-media-col">
                    <div className="tyn-media-row">
                      <h4 className="name">
                        <span id="fullname"></span>
                        <span className="username"></span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tyn-profile-nav">
              <ul className="nav nav-tabs nav-tabs-line">
                <li className="nav-item">
                  <button
                    className="nav-link active"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-edit"
                    type="button"
                  >
                    Chỉnh sửa thông tin
                  </button>
                </li>
              </ul>
            </div>
            <div className="tyn-profile-details">
              <div className="tab-content">
                <div
                  className="tab-pane show active"
                  id="profile-edit"
                  tabIndex="0"
                >
                  <div className="row gy-5">
                    <div className="col-12">
                      <div className="row gy-4">
                        <div className="col-lg-3">
                          <h6>Thông tin cá nhân</h6>
                        </div>
                        <div className="col-lg-9">
                          <div className="row g-gs">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  htmlFor="full_name"
                                >
                                  Họ tên
                                </label>
                                <div className="form-control-wrap">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="full_name"
                                    placeholder="Họ tên"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  htmlFor="username"
                                >
                                  Tên đăng nhập
                                </label>
                                <div className="form-control-wrap">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Username"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label
                                  className="form-label d-flex"
                                  htmlFor="email"
                                >
                                  Email
                                </label>
                                <div className="form-control-wrap">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  htmlFor="created_at"
                                >
                                  Ngày tham gia
                                </label>
                                <div className="form-control-wrap">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="created_at"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <button
                                  className="btn btn-primary"
                                  id="update-profile"
                                  type="submit"
                                >
                                  Cập nhật thông tin
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="row gy-4">
                        <div className="col-lg-3">
                          <h6>Bảo mật</h6>
                          <div className="tyn-subtext">Đổi mật khẩu</div>
                        </div>
                        <div className="col-lg-9">
                          <div className="row g-gs">
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  htmlFor="password"
                                >
                                  Mật khẩu cũ
                                </label>
                                <div className="form-control-wrap">
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  htmlFor="new-password"
                                >
                                  Mật khẩu mới
                                </label>
                                <div className="form-control-wrap">
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="new-password"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  htmlFor="new-password-again"
                                >
                                  Nhập lại mật khẩu mới
                                </label>
                                <div className="form-control-wrap">
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="new-password-again"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <button
                                  className="btn btn-primary"
                                  id="update-password"
                                  type="submit"
                                >
                                  Cập nhật mật khẩu
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
