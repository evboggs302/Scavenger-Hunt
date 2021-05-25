import { Switch, Route } from "react-router-dom";
import Container from "../ui/Container/Container.js";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Container} />
      <Route />
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
