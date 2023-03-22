"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const huntReducer_1 = require("../../../dux/reducers/huntReducer");
const teamsReducer_1 = require("../../../dux/reducers/teamsReducer");
const cluesReducer_1 = require("../../../dux/reducers/cluesReducer");
const apiUtils_1 = require("../../../utils/apiUtils");
// 61323e0247dc492611e225dc
const TempLandingPage = () => {
    const state = (0, react_redux_1.useAppSelector)((state) => state);
    const dispatch = (0, react_redux_1.useAppDispatch)();
    const huntName = (0, react_1.useRef)("");
    let history = (0, react_router_dom_1.useHistory)();
    const buttonClick = async () => {
        console.log(huntName.current);
        const data = await (0, apiUtils_1.fetchHuntData)(huntName.current);
        console.log(data);
        dispatch((0, huntReducer_1.setHunt)(data[0]));
        dispatch((0, teamsReducer_1.setTeams)(data[0].teams));
        dispatch((0, cluesReducer_1.setClues)(data[0].clues));
        return history.push("/hunt");
    };
    console.log(state);
    return (React.createElement("div", null,
        React.createElement("h2", null, "Welcome!"),
        React.createElement("br", null),
        React.createElement("p", null, "give instructions hers"),
        React.createElement("br", null),
        React.createElement("p", null, "Already have an active hunt? Enter the hunt id below."),
        React.createElement("input", { type: "text", onChange: (e) => (huntName.current = e.target.value) }),
        React.createElement("button", { onClick: buttonClick }, "Go to Hunt")));
};
exports.default = TempLandingPage;
