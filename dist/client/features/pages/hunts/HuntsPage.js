"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const stateHooks_1 = require("@dux/stateHooks");
const react_router_dom_1 = require("react-router-dom");
const huntReducer_1 = require("../../../dux/reducers/huntReducer");
const apiUtils_1 = require("../../../utils/apiUtils");
require("./huntspage.scss");
const HuntsPage = () => {
    const state = (0, stateHooks_1.useAppSelector)((state) => state);
    const dispatch = (0, stateHooks_1.useAppDispatch)();
    const huntName = (0, react_1.useRef)("");
    let history = (0, react_router_dom_1.useHistory)();
    const buttonClick = async () => {
        const { data } = await (0, apiUtils_1.createHunt)(huntName.current);
        huntName.current = "";
        return dispatch((0, huntReducer_1.setHunt)(data[0]));
    };
    const activationClick = async () => {
        const ok = await (0, apiUtils_1.activateHunt)(state.hunt._id);
        if (ok) {
            const activeHunt = { ...state.hunt, isActive: true };
            dispatch((0, huntReducer_1.setHunt)(activeHunt));
            return history.push("/responses");
        }
        else {
            return;
        }
    };
    return (react_1.default.createElement("div", null, !state.hunt.name ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("input", { type: "text", placeholder: "Hunt Name", onChange: (e) => (huntName.current = e.target.value) }),
        react_1.default.createElement("button", { onClick: buttonClick }, "Create Hunt"),
        " ")) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("br", null),
        react_1.default.createElement("span", null,
            "HUNT NAME:",
            "  ",
            react_1.default.createElement("strong", null,
                react_1.default.createElement("em", null, state.hunt.name))),
        react_1.default.createElement("br", null),
        state.clues.length > 0 &&
            state.teams.length > 0 &&
            !state.hunt.isActive && (react_1.default.createElement("button", { onClick: activationClick }, "Activate Hunt!"))))));
};
exports.default = HuntsPage;
