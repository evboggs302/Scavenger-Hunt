// import { useState } from "react";
import { Link } from "react-router-dom";
import Routes from "./utils/routes.js";
// import { fetchActiveUser } from "./utils/apiUtils.ts";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="app-navigation">
        <h3>
          <Link to="/">Home</Link>
        </h3>
        <h3>
          <Link to="/hunt">Hunt Info</Link>
        </h3>
        <h3>
          <Link to="/clues">Clues</Link>
        </h3>
        <h3>
          <Link to="/teams">Teams</Link>
        </h3>
        <h3>
          <Link to="/responses">Responses</Link>
        </h3>
      </nav>
      <br />
      <Routes />
    </div>
  );
}

export default App;
