import { Switch, Route } from "react-router-dom";
// import LandingPage from "../ui/pages/landing/LandingPage";
import Login from "../ui/pages/login/LoginPage";
import HuntsPage from "../ui/pages/hunts/HuntsPage";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/hunts" component={HuntsPage} />
      {/* <Route /> */}
      {/* <Route /> */}
      {/* <Route /> */}
      <Route
        path="*"
        render={() => {
          return <div> 404 file not found</div>;
        }}
      />
    </Switch>
  );
}
