// import { useState } from "react";
import React from "react";
// import { Link } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "react-query";
// import Routes from "@utils/routes";
// import { fetchActiveUser } from "./utils/apiUtils";
import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <nav className="app-navigation">
//         <h3>
//           <Link to="/">Home</Link>
//         </h3>
//         <h3>
//           <Link to="/hunt">Hunt Info</Link>
//         </h3>
//         <h3>
//           <Link to="/clues">Clues</Link>
//         </h3>
//         <h3>
//           <Link to="/teams">Teams</Link>
//         </h3>
//         <h3>
//           <Link to="/responses">Responses</Link>
//         </h3>
//       </nav>
//       <br />
//       <Routes />
//     </div>
//   );
// }

// const queryClient = new QueryClient();

function WrappedApp() {
  return (
    // <QueryClientProvider client={queryClient}>
    //   <App />
    // </QueryClientProvider>
    <h1>HELLO VITE WORLD</h1>
  );
}

export default WrappedApp;