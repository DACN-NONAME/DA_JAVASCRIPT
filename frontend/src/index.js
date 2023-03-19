/* eslint-disable */
/* eslint react/prop-types: 0 */
import React from "react";
import ReactDOM from "react-dom/client";
// import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

// Chèn trang VIEW vào
import BodyPage from "./views/body";

const root = ReactDOM.createRoot(document.getElementById("tyn-root"));
root.render(<BodyPage />);
// ReactDOM.render(<BodyPage />, document.getElementById("tyn-root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
