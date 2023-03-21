"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const stateHooks_1 = require("@dux/stateHooks");
const react_router_dom_1 = require("react-router-dom");
const cluesReducer_1 = require("../../../dux/reducers/cluesReducer");
const apiUtils_1 = require("../../../utils/apiUtils");
const CluesPage = () => {
    const state = (0, stateHooks_1.useAppSelector)((state) => state);
    const [cluesExist, setCluesExist] = (0, react_1.useState)(false);
    const [cluesLength, setLength] = (0, react_1.useState)(0);
    const [clues, setTempClues] = (0, react_1.useState)([]);
    const draft = (0, react_1.useRef)(null);
    const dispatch = (0, stateHooks_1.useAppDispatch)();
    let history = (0, react_router_dom_1.useHistory)();
    (0, react_1.useEffect)(() => {
        if (!state.hunt._id) {
            history.push("/");
        }
        if (state.clues.length > 0) {
            setCluesExist(true);
        }
        draft.current = [];
    }, []);
    (0, react_1.useEffect)(() => {
        let tempClues = [];
        for (let i = 0; i < cluesLength; i++) {
            tempClues.push("");
        }
        setTempClues(tempClues);
    }, [cluesLength]);
    const mappedClueTemplates = clues.map((el, dex) => {
        return (React.createElement(react_1.Fragment, { key: dex + 1 },
            React.createElement("textarea", { name: "clueText", id: dex, cols: "30", rows: "10", onChange: (e) => (draft.current[dex] = e.target.value) }),
            React.createElement("br", null)));
    });
    const mappedClues = state.clues.map((el) => {
        return React.createElement("li", { key: el._id }, el.description);
    });
    const saveClues = async () => {
        const { data } = await (0, apiUtils_1.createClues)(state.hunt._id, draft.current);
        dispatch((0, cluesReducer_1.setClues)(data));
        setCluesExist(true);
        return;
    };
    return (React.createElement("div", null,
        !cluesExist ? (React.createElement(React.Fragment, null,
            React.createElement("section", null, "Create your clues below."),
            React.createElement("br", null),
            React.createElement("span", null,
                React.createElement("div", null, "How many clues?"),
                React.createElement("input", { type: "number", onChange: (e) => setLength(+e.target.value) })))) : null,
        React.createElement("br", null),
        !cluesExist ? (React.createElement("span", null, mappedClueTemplates)) : (React.createElement("ol", null, mappedClues)),
        !cluesExist && React.createElement("button", { onClick: saveClues }, "Save Clues")));
};
exports.default = CluesPage;
