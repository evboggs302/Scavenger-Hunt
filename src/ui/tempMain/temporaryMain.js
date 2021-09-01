import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "react-query";

const TempMain = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Hunt Home</Link>
          </li>
          <li>
            <Link to="/clues">Clues</Link>
          </li>
          <li>
            <Link to="/teams">Teams</Link>
          </li>
          <li>
            <Link to="/responses">Responses</Link>
          </li>
        </ul>
      </nav>
      <br />
      <section></section>
    </div>
  );
};
export default TempMain;
