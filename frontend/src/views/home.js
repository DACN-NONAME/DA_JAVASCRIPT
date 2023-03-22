/* eslint-disable */
import React from "react";

function App() {
  return (
    <div className="tyn-content tyn-content-full-height tyn-chat">
      <div className="tyn-aside tyn-aside-base">
        <div className="tyn-aside-head">
          <div className="tyn-aside-head-text">
            <h3 className="tyn-aside-title">Chats</h3>
          </div>
          <div className="tyn-aside-head-tools">
            <button
              className="btn btn-sm btn-info"
              id="search-stranger"
              onClick={searchStranger}
              style={{ display: "none" }}
            >
              Tìm kiếm người lạ
            </button>
            <button
              className="btn btn-sm btn-warning"
              id="searching-stranger"
              onClick={searchingStranger}
              style={{ display: "none" }}
            >
              Đang tìm kiếm người lạ
            </button>
            <button
              className="btn btn-sm btn-danger"
              id="leave-stranger"
              onClick={leaveStranger}
              style={{ display: "none" }}
            >
              Kết thúc trò chuyện người lạ
            </button>
          </div>
        </div>
        <div className="tyn-aside-body" data-simplebar>
          <div className="tyn-aside-search">
            {/* <div className="form-group tyn-pill">
              <div className="form-control-wrap">
                <div className="form-control-icon start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="form-control form-control-solid"
                  id="search"
                  placeholder="Search contact / chat"
                />
              </div>
            </div> */}
          </div>
          <div className="tab-content">
            <div
              className="tab-pane show active"
              id="all-chats"
              tabIndex="0"
              role="tabpanel"
            >
              <ul className="tyn-aside-list">
                {/* <li className="tyn-aside-item js-toggle-main active">
                  <div className="tyn-media-group">
                    <div className="tyn-media tyn-size-lg">
                      <img src="images/avatar/1.jpg" alt="" />
                    </div>
                    <div className="tyn-media-col">
                      <div className="tyn-media-row">
                        <h6 className="name">Kênh chung</h6>
                        <span className="typing">idle.</span>
                      </div>
                      <div className="tyn-media-row has-dot-sap">
                        <p className="content">typing...</p>
                        <span className="meta">now</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="tyn-aside-item js-toggle-main">
                  <div className="tyn-media-group">
                    <div className="tyn-media tyn-size-lg">
                      <img src="images/avatar/1.jpg" alt="" />
                    </div>
                    <div className="tyn-media-col">
                      <div className="tyn-media-row">
                        <h6 className="name">nguyễn đã trả lời.</h6>
                        <span className="typing">typing ...</span>
                      </div>
                      <div className="tyn-media-row has-dot-sap">
                        <p className="content">bla bla.</p>
                        <span className="meta">45 min</span>
                      </div>
                    </div>
                  </div>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="tyn-main tyn-chat-content" id="tynMain">
        <div className="tyn-chat-head">
          <ul className="tyn-list-inline d-md-none ms-n1">
            <li>
              <button className="btn btn-icon btn-md btn-pill btn-transparent js-toggle-main">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </button>
            </li>
          </ul>
          <div className="tyn-media-group">
            <div className="tyn-media tyn-size-lg d-none d-sm-inline-flex">
              <img src="images/avatar/1.jpg" alt="" />
            </div>
            <div className="tyn-media tyn-size-rg d-sm-none">
              <img src="images/avatar/1.jpg" alt="" />
            </div>
            <div className="tyn-media-col">
              <div className="tyn-media-row">
                <h6 className="name" id="room_name"></h6>
              </div>
              <div className="tyn-media-row has-dot-sap">
                <span className="meta">Active</span>
              </div>
            </div>
          </div>
          <ul className="tyn-list-inline gap gap-3 ms-auto">
            {/* <li className="d-none d-sm-block">
              <button className="btn btn-icon btn-light js-toggle-chat-search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </li> */}
          </ul>
          {/* <div className="tyn-chat-search" id="tynChatSearch">
            <div className="flex-grow-1">
              <div className="form-group">
                <div className="form-control-wrap form-control-plaintext-wrap">
                  <div className="form-control-icon start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-plaintext"
                    id="searchInThisChat"
                    placeholder="Search in this chat"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap gap-3">
              <ul className="tyn-list-inline ">
                <li>
                  <button className="btn btn-icon btn-sm btn-transparent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                      />
                    </svg>
                  </button>
                </li>
                <li>
                  <button className="btn btn-icon btn-sm btn-transparent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
              <ul className="tyn-list-inline ">
                <li>
                  <button className="btn btn-icon btn-md btn-light js-toggle-chat-search">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
        <div className="tyn-chat-body" id="tynChatBody">
          <div className="tyn-reply" id="tynReply">
            {/* <div className="tyn-reply-item incoming">
              <div className="tyn-reply-avatar">
                <div className="tyn-media tyn-size-md tyn-circle">
                  <img src="images/avatar/2.jpg" alt="" />
                </div>
              </div>
              <div className="tyn-reply-group">
                <div className="tyn-reply-bubble">
                  <div className="tyn-reply-link">
                    <a
                      className="tyn-reply-anchor"
                      href="https://www.envato.com/atomic-power-plant-engine/"
                    >
                      https://www.envato.com/atomic-power-plant-engine/
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="tyn-reply-item incoming">
              <div className="tyn-reply-avatar">
                <div className="tyn-media tyn-size-md tyn-circle">
                  <img src="images/avatar/2.jpg" alt="" />
                </div>
              </div>
              <div className="tyn-reply-group">
                <div className="tyn-reply-bubble">
                  <div className="tyn-reply-text">
                    {" "}
                    I hope these article helps.{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="tyn-reply-item outgoing">
              <div className="tyn-reply-group">
                <div className="tyn-reply-bubble">
                  <div className="tyn-reply-text">nguyễn phát đã nhắn tin.</div>
                </div>
              </div>
            </div>
            <div className="tyn-reply-item outgoing">
              <div className="tyn-reply-group">
                <div className="tyn-reply-bubble">
                  <div className="tyn-reply-text">
                    nguyễn phát đã nhắn tin 2.
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="tyn-reply-item incoming">
              <div className="tyn-reply-avatar">
                <div className="tyn-media tyn-size-md tyn-circle">
                  <img src="images/avatar/2.jpg" alt="" />
                </div>
              </div>
              <div className="tyn-reply-group">
                <div className="tyn-reply-bubble">
                  <div className="tyn-reply-link">
                    <a
                      className="tyn-reply-anchor"
                      href="https://www.envato.com/atomic-power-plant-engine/"
                    >
                      https://www.envato.com/atomic-power-plant-engine/
                    </a>
                  </div>
                </div>
                <div className="tyn-reply-bubble">
                  <div className="tyn-reply-text">
                    {" "}
                    I hope these article helps.{" "}
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="tyn-reply-separator">bla bla.</div> */}
          </div>
        </div>
        <div id="cursor" style={{ display: "none" }}></div>
        <div className="tyn-chat-form">
          <div className="tyn-chat-form-insert"></div>
          <div className="tyn-chat-form-enter">
            <div
              className="tyn-chat-form-input"
              id="tynChatInput"
              contentEditable
            ></div>
            <ul className="tyn-list-inline me-n2 my-1">
              <li>
                <button className="btn btn-icon btn-white btn-md btn-pill">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-send-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="modal fade" tabIndex="-1" id="muteOptions">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content border-0">
            <div className="modal-body p-4">
              <h4 className="pb-2">Mute conversation</h4>
              <ul className="tyn-media-list gap gap-2">
                <li>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="muteFor"
                      id="muteFor15min"
                    />
                    <label className="form-check-label" htmlFor="muteFor15min">
                      {" "}
                      For 15 minutes{" "}
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="muteFor"
                      id="muteFor1Hour"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="muteFor1Hour">
                      {" "}
                      For 1 Hours{" "}
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="muteFor"
                      id="muteFor1Days"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="muteFor1Days">
                      {" "}
                      For 1 Days{" "}
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="muteFor"
                      id="muteForInfinity"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="muteForInfinity"
                    >
                      {" "}
                      Until I turn back On{" "}
                    </label>
                  </div>
                </li>
              </ul>
              <ul className="tyn-list-inline gap gap-3 pt-3">
                <li>
                  <button className="btn btn-md btn-danger js-chat-mute">
                    Mute
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-md btn-light"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </li>
              </ul>
            </div>
            <button
              className="btn btn-md btn-icon btn-pill btn-white shadow position-absolute top-0 end-0 mt-n3 me-n3"
              data-bs-dismiss="modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
