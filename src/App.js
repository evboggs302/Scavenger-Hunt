import { useEffect } from "react";
import { Content } from "carbon-components-react";
import { BrowserRouter } from "react-router-dom";
import Header from "./ui/header/AppHeader.js";
import Routes from "./utils/routes.js";
import "./App.scss";

function App(props) {
  useEffect(() => {}, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Content>
          <Routes />
        </Content>
      </BrowserRouter>
    </div>
  );
}

export default App;
