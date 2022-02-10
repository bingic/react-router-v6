/* src/router/routes */

/* 懒加载方法 */
import { lazy } from "react";
/* app 布局 */
import Login from "../components/Login";
/* 引入Loadable为懒加载渲染组件 */
import Loadable from "./loadable";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* 懒加载的组件 */
const User = Loadable(lazy(() => import("../components/User")));
const Home = Loadable(lazy(() => import("../components/Home")));
const NotFound = Loadable(lazy(() => import("../components/NotFound")));

/* 重定向 */
function Redirect({ to }) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

const router = [
  {
    path: "/",
    element: <Login />,
    children: [
      {
        /* 嵌套索引index 嵌套下 <Outlet /> 默认加载该组件 */
        index: true,
        element: <Home />,
      },

      { path: "/user", element: <User /> },
    ],
  },
  { path: "/not", element: <NotFound /> },
  // 重定向
  { path: "/login", element: <Redirect to="/user" /> },

  // 404找不到
  { path: "*", element: <NotFound /> },
];


export default router;
