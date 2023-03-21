"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
// import { Link } from "react-router-dom";
require("./header.scss");
const AppHeader = () => {
    (0, react_1.useEffect)(() => { }, []);
    return (react_1.default.createElement("header", { className: "app-header" },
        react_1.default.createElement("span", null, "1"),
        react_1.default.createElement("span", null, "2")));
};
exports.default = (0, react_1.memo)(AppHeader);
