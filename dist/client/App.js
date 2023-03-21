"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { useState } from "react";
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_query_1 = require("react-query");
const routes_js_1 = require("./utils/routes.js");
// import { fetchActiveUser } from "./utils/apiUtils";
require("./App.css");
const queryClient = new react_query_1.QueryClient();
function WrappedApp() {
    return (react_1.default.createElement(react_query_1.QueryClientProvider, { client: queryClient },
        react_1.default.createElement(App, null)));
}
function App() {
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement("nav", { className: "app-navigation" },
            react_1.default.createElement("h3", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/" }, "Home")),
            react_1.default.createElement("h3", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/hunt" }, "Hunt Info")),
            react_1.default.createElement("h3", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/clues" }, "Clues")),
            react_1.default.createElement("h3", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/teams" }, "Teams")),
            react_1.default.createElement("h3", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/responses" }, "Responses"))),
        react_1.default.createElement("br", null),
        react_1.default.createElement(routes_js_1.default, null)));
}
exports.default = WrappedApp;
