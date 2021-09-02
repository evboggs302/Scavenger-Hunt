// import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Link } from "react-router-dom";
import Routes from "./utils/routes.js";
// import { fetchActiveUser } from "./utils/apiUtils.ts";
import "./App.css";

const queryClient = new QueryClient();

const AppWrapper = () => {
  // const user = useQuery("user", fetchActiveUser);
  // let history = useHistory();

  // if (!user.data) {
  //   history.push("/");
  // }

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
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper />
    </QueryClientProvider>
  );
}

export default App;
