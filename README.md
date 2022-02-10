## React-Router-Dom-V6

​     前言：

​     项目使用npx create-react-app my-app脚手架创建

> 安装

```bash
$ yarn add react-router-dom@6
```

> 修改src/index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
//BrowserRouter将<App />包裹
ReactDOM.render(
  <BrowserRouter> 
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

> 新建组件文件夹src/components

```
├── components
│   ├── Home
│   │   └── index.js
│   ├── Login
│   │   └── index.js
│   ├── NotFound
│   │   └── index.js
│   └── User
│       └── index.js
```

> rfce快捷键修改每个（Login除外）index.js 如下

```jsx
import React from 'react'
function index() {
  return (
    <div>这里填写组件名称</div>
  )
}
export default index
```

> 新建文件夹src/router

> 按照以下布局新建文件

```js
├── router
│   ├── loadable.js //懒加载 loader
│   ├── index.js //主文件 渲染组件
│   └── routes.js  //路由核心
```

> 注意：嵌套路由需引用<Outlet />组件作为出口

```jsx
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
```



> index.js

```jsx
/* src/router/index */
import { useRoutes } from 'react-router-dom';

// routes
import routes from '../router/routes';

// ==|| ROUTING RENDER 路由渲染 ||== //

export default function Routes() {
    return useRoutes(routes);
}
```

> loadable.js

```jsx
/* src/router/loadable */
import { Suspense } from "react";

// ==|| LOADABLE - LAZY LOADING ||== //

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<div>loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;

```

> routes.js

```jsx
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

/* 重定向 V6版本方法 详情参考代码末尾链接 */
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

```

> [重定向功能在V6版本修改了，点击查看[详情]](https://reactrouter.com/docs/en/v6/upgrading/reach#what-about-clicking-links-that-arent-updated)

> 修改app.js

```jsx
import logo from "./logo.svg";
import "./App.css";
import Routes from "./router";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* 引用渲染路由组件 */}
        <Routes />
      </header>
    </div>
  );
}

export default App;
```

> 附录：
>
> [源码地址：https://github.com/bingic/react-router-v6](https://github.com/bingic/react-router-v6)
>
> [router官网：https://reactrouter.com](https://reactrouter.com)

