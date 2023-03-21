"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
// import LandingPage from "../ui/pages/landing/LandingPage";
// import Login from "../ui/pages/login/LoginPage";
const tempLandingPage_1 = require("../ui/pages/landing/tempLandingPage");
const HuntsPage_1 = require("../ui/pages/hunts/HuntsPage");
const CluesPage_1 = require("../ui/pages/clues/CluesPage");
const TeamsPage_1 = require("../ui/pages/teams/TeamsPage");
const ResponsesPage_1 = require("../ui/pages/responses/ResponsesPage");
const Routes = () => {
    return (react_1.default.createElement(react_router_dom_1.Switch, null,
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: tempLandingPage_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/hunt", component: HuntsPage_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/clues", component: CluesPage_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/teams", component: TeamsPage_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/responses", component: ResponsesPage_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "*", render: () => {
                return react_1.default.createElement("div", null, " 404 file not found");
            } })));
};
exports.default = Routes;
