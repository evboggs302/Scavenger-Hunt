// import { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { Link, useHistory } from "react-router-dom";
import Routes from "./utils/routes.js";
import { fetchActiveUser } from "./utils/apiUtils.ts";
import "./App.css";

const queryClient = new QueryClient();

const AppWrapper = () => {
  const user = useQuery("user", fetchActiveUser);
  let history = useHistory();

  if (!user.data) {
    history.push("/");
  }

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/hunt">Hunt Info</Link>
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
      <Routes />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper />
    </QueryClientProvider>
  );
}

export default App;
