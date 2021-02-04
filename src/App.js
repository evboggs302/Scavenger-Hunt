import { Switch, Route } from "react-router-dom";
import Container from "./Container.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" />
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
        <Container />
      </header>
    </div>
  );
}

export default App;