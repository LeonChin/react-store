import React, { useMemo } from "react";
import Header from "../components/Header/Header";

export const Layout = (props) => {
  const user = useMemo(() => {
    const user = global.auth.getUser() || {};
    return user;
  }, []);
  return (
    <div className="main">
      <Header user={user} />
      {props.children}
    </div>
  );
};
