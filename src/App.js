import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { get_test } from "./utils/get.js";
import Header from "./ui/Header/Header.js";
import Routes from "./utils/routes";
import "./App.css";

function App(props) {
  useEffect(() => {
    get_test();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <br />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
