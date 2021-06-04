import { Switch, Route } from "react-router-dom";
import LandingPage from "../ui/content/LandingPage";
import HuntsPage from "../ui/content/HuntsPage";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/hunts" component={HuntsPage} />
      <Route />
      <Route />
      <Route />
      <Route
        path="*"
        render={() => {
          return <div> 404 file not found</div>;
        }}
      />
    </Switch>
  );
}
