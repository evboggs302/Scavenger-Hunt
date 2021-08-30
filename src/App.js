// import { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { useHistory } from "react-router-dom";
import Routes from "./utils/routes.js";
import { fetchActiveUser } from "./utils/apiUtils";
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
