import logo from "./logo.svg";
import Container from "./Container.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Container />
      </header>
    </div>
  );
}

export default App;
