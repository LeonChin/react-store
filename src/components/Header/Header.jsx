import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Header = (props) => {
  let navigate = useNavigate();
  const logout = () => {
    global.auth.logOut();
    navigate(0);
  };
  return (
    <div className="header">
      <div className="grid">
        <div className="start">
          <Link to="/">Home</Link>
        </div>
        <div className="end">
          {props.user.nickname ? (
            <>
              <span className="nickname">
                <i className="far fa-user"></i>
                {props.user.nickname}
              </span>
              <span
                className="nickname"
                onClick={logout}
                style={{ marginLeft: " 2rem" }}
              >
                Logout
              </span>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
