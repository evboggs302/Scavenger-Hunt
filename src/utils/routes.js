import { Switch, Route } from "react-router-dom";
// import LandingPage from "../ui/pages/landing/LandingPage";
// import Login from "../ui/pages/login/LoginPage";
import TemporaryMain from '../ui/tempMain/temporaryMain'
import HuntsPage from "../ui/pages/hunts/HuntsPage";

export default function Routes() {
  return (
    <Switch>
      {/* <Route exact path="/" component={Login} /> */}
      <Route exact path="/" component={TemporaryMain} />
      <Route path="/hunt" component={HuntsPage} />
      <Route path="/clues" component={HuntsPage} />
      <Route path="/teams" component={HuntsPage} />
      <Route path="/responses" component={HuntsPage} />
      <Route
        path="*"
        render={() => {
          return <div> 404 file not found</div>;
        }}
      />
    </Switch>
  );
}
