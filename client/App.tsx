import React from "react";
import { Link } from "react-router-dom";
import AppRoutes from "./src/utils/AppRoutes";
import "./App.css";
import { UserContextProvider } from "./src/shared/user/UserContextProvider";

function App() {
  return (
    <UserContextProvider>
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
        <AppRoutes />
      </div>
    </UserContextProvider>
  );
}

export default App;
