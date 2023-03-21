
import React from 'react';
import { Switch, Route } from "react-router-dom";
// import LandingPage from "../ui/pages/landing/LandingPage";
// import Login from "../ui/pages/login/LoginPage";
import TempLandingPage from "../ui/pages/landing/tempLandingPage";
import HuntsPage from "../ui/pages/hunts/HuntsPage";
import CluesPage from "../ui/pages/clues/CluesPage";
import TeamsPage from "../ui/pages/teams/TeamsPage";
import ResponsesPage from "../ui/pages/responses/ResponsesPage";

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
}

export default Routes;