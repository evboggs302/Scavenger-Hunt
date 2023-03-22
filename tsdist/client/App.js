"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { useState } from "react";
const react_1 = require("react");
// import { Link } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "react-query";
// import Routes from "@utils/routes";
// import { fetchActiveUser } from "./utils/apiUtils";
require("./App.css");
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
    react_1.default.createElement("h1", null, "HELLO VITE WORLD"));
}
exports.default = WrappedApp;
