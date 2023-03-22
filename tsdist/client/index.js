"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
require("./index.scss");
const App_1 = require("./App");
const store_1 = require("./dux/store");
react_dom_1.default.render(react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
    react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(App_1.default, null))), document.getElementById("root"));
