// import { BrowserRouter } from "react-router-dom";
import Header from "./ui/header/AppHeader.js";
import Login from "./ui/pages/login/LoginPage.js";
// import Routes from "./utils/routes.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Login />
      {/* <BrowserRouter>
        <Routes />
      </BrowserRouter> */}
    </div>
  );
}

export default App;
