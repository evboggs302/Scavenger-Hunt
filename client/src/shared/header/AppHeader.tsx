import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "./useLogoutMutation";

const AppHeader = () => {
  // const result = useUserContext();
  const { logoutUser, loading } = useLogoutMutation();

  const onClick = async () => {
    await logoutUser();
    return;
  };

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
        <h3>
          <button disabled={loading} onClick={onClick}>
            LOGOUT
          </button>
        </h3>
      </nav>
    </header>
  );
};
export default memo(AppHeader);
