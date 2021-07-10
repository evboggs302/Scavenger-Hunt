import { memo, useEffect } from "react";
import { get_test } from "../../utils/getTest";
// import { Link } from "react-router-dom";
import "./header.scss";

const AppHeader = () => {
  useEffect(() => {
    get_test();
  }, []);
  return (
    <header className="app-header">
      <span>1</span>
      <span>2</span>
    </header>
  );
};
export default memo(AppHeader);
