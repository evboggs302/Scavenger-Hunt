import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";

const TempMain = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
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
