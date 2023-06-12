import React from "react";
import { Routes, Route } from "react-router-dom";
// import LandingPage from "../ui/pages/landing/LandingPage";
// import Login from "../ui/pages/login/LoginPage";
import TempLandingPage from "../features/pages/landing/tempLandingPage";
// import HuntsPage from "../features/pages/hunts/HuntsPage";
// import ResponsesPage from "../features/pages/responses/ResponsesPage";
// import CluesPage from "../features/pages/clues/CluesPage";
// import TeamsPage from "../features/pages/teams/TeamsPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route exact path="/" element={Login} /> */}
      <Route path="/" element={<TempLandingPage />} />
      {/* <Route path="/hunt" element={HuntsPage} />
      <Route path="/clues" element={CluesPage} />
      <Route path="/teams" element={TeamsPage} />
      <Route path="/responses" element={ResponsesPage} /> */}
      <Route path="*" element={<div> 404 file not found</div>} />
    </Routes>
  );
};

export default AppRoutes;
