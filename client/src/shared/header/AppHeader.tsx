import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./header.scss";

const AppHeader = () => {
  useEffect(() => {}, []);
  return (
    <header className="app-header">
      <nav className="app-navigation">
        <h3>
          <Link to="/dashboard">Home</Link>
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
    </header>
  );
};
export default memo(AppHeader);
