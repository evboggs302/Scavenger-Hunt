import React from "react";
import { Switch, Route } from "react-router-dom";
// import LandingPage from "../ui/pages/landing/LandingPage";
// import Login from "../ui/pages/login/LoginPage";
import TempLandingPage from "../features/pages/landing/tempLandingPage";
import HuntsPage from "../features/pages/hunts/HuntsPage";
import ResponsesPage from "../features/pages/responses/ResponsesPage";
import CluesPage from "../features/pages/clues/CluesPage";
import TeamsPage from "../features/pages/teams/TeamsPage";

const Routes = () => {
  return (
    <Switch>
      {/* <Route exact path="/" component={Login} /> */}
      <Route exact path="/" component={TempLandingPage} />
      <Route path="/hunt" component={HuntsPage} />
      <Route path="/clues" component={CluesPage} />
      <Route path="/teams" component={TeamsPage} />
      <Route path="/responses" component={ResponsesPage} />
      <Route
        path="*"
        render={() => {
          return <div> 404 file not found</div>;
        }}
      />
    </Switch>
  );
};

export default Routes;
