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
