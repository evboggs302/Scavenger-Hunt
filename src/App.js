import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { get_test } from "./utils/get.js";
import Header from "./ui/Header/Header.js";
import Routes from "./utils/routes";
import "./App.css";

function App(props) {
  const [src, setSRC] = useState("");
  useEffect(() => {
    // get_test();
    axios
      .post("/api/test/findActiveTeam", {
        From: "+13025933237",
        NumMedia: "1",
        MediaUrl0:
          "https://api.twilio.com/2010-04-01/Accounts/AC898dc2e85e9cb91e87ec6a0de7487d41/Messages/MM7462aee02e91ad2d84bce6c996780c33/Media/MEef1a79097bda800a4240cc4082f41ae0",
      })
      .then((res) => {
        console.log(res);
        setSRC(res.data);
      });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <br />
        <Routes />
      </BrowserRouter>
      <img src={src} alt="" />
    </div>
  );
}

export default App;
