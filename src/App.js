import { useEffect, useState } from "react";
// import { BrowserRouter } from "react-router-dom";
import axios from "axios";
// import Header from "./ui/header/AppHeader.js";
// import Routes from "./utils/routes.js";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [users, setUsers] = useState("");
  useEffect(() => {
    axios.get("/api/user/getAll").then((res, err) => {
      console.log(res);
      // setUsers(res.data);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{users}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
      {/* <div className="App">
        <BrowserRouter>
          <Header />
          <Routes />
        </BrowserRouter>
      </div> */}
    </div>
  );
}

export default App;
