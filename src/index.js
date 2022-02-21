import React from "react";
import ReactDOM from "react-dom";
import Router from "./Router";
import "./index.scss";
import { ToastContainer } from "react-toastify";
import "./utility/auth";

ReactDOM.render(
  <div>
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Router />
  </div>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
