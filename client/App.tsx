import React from "react";
import { Link } from "react-router-dom";
import Routes from "./src/utils/routes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>HELLO VITE WORLD</h1>
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
      {/* <Routes /> */}
    </div>
  );
}

export default App;
