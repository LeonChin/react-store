import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ToolBox = ({ search, cartNum }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    search(e.target.value);
  };

  const handleClick = () => {
    setText("");
    search("");
  };

  let navigate = useNavigate();
  const goCart = () => {
    if (!global.auth.isLogin()) {
      navigate("/login");
      toast.info("Please Login First");
      return;
    }
    navigate("/cart");
  };

  return (
    <div className="tool-box">
      <div className="logo-text">store</div>
      <div className="search-box">
        <div className="field has-addons">
          <p className="control">
            <input
              className="input search-input"
              type="text"
              placeholder="Search Product"
              value={text}
              onChange={handleChange}
            />
          </p>
          <p className="control" onClick={handleClick}>
            <span className="button is-static">X</span>
          </p>
        </div>
      </div>
      <div className="cart-box" onClick={goCart}>
        <i className="fas fa-shopping-cart"></i>
        <span className="cart-num">({cartNum})</span>
      </div>
    </div>
  );
};
