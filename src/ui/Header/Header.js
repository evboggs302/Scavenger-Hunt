import { memo } from "react";
import { Link } from "react-router-dom";

const Header = memo(function Header(props) {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/hunt/:id">Hunts</Link>
        <Link to="/hunt/:id/:teamName">Teams (sub-route)</Link>
      </nav>
    </header>
  );
});

export default Header;
