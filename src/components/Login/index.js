/* src/components/Login/index.js */
import React from "react";
import { Outlet } from "react-router-dom";

function Login() {
  return (
    <>
      <div>父组件 Login</div>
      嵌套组件如下
      <Outlet />
    </>
  );
}

export default Login;
