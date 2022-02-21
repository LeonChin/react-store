import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./pages/App/App";
import App from "./pages/App/App.jsx";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login";
import Notfound from "./pages/Notfound/Notfound";
import Register from "./pages/Register/Register";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
