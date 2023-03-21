"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const stateHooks_1 = require("@dux/stateHooks");
const react_query_1 = require("react-query");
const react_router_dom_1 = require("react-router-dom");
const teamsReducer_1 = require("../../../dux/reducers/teamsReducer");
const apiUtils_1 = require("../../../utils/apiUtils");
const TeamsPage = () => {
    const state = (0, stateHooks_1.useAppSelector)((state) => state);
    const [teamsExist, setTeamsExist] = (0, react_1.useState)(false);
    const [teamsNumber, setTeamNum] = (0, react_1.useState)(0);
    const [teams, setTempTeams] = (0, react_1.useState)([]);
    const [saveReady, setReady] = (0, react_1.useState)(false);
    const dispatch = (0, stateHooks_1.useAppDispatch)();
    let history = (0, react_router_dom_1.useHistory)();
    (0, react_1.useEffect)(() => {
        if (!state.hunt._id) {
            history.push("/");
        }
        if (state.teams.length > 0) {
            setTeamsExist(true);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        let keyCount = 0;
        for (let i = 0; i < teams.length; i++) {
            keyCount += Object.keys(teams[i]).length;
        }
        const hasKeys = teams.length * 2 === keyCount && teams.length > 0;
        if (hasKeys) {
            setReady(true);
        }
    }, [teams]);
    (0, react_1.useEffect)(() => {
        let tempTeams = [];
        for (let i = 0; i < teamsNumber; i++) {
            tempTeams.push({});
        }
        setTempTeams(tempTeams);
    }, [teamsNumber]);
    const updateTeamMembers = (value, dex) => {
        let copy = teams.slice();
        copy[dex].members = value.split(",").map((el) => el.trim());
        setTempTeams(copy);
    };
    const updateTeamPhone = (value, dex) => {
        let copy = teams.slice();
        copy[dex].phone = value;
        setTempTeams(copy);
    };
    const mappedTeamTemplates = teams.map((el, dex) => {
        return (React.createElement(react_1.Fragment, { key: dex + 1 },
            React.createElement("textarea", { name: "clueText", id: dex, placeholder: "MEMBERS (comma separated)", cols: "30", rows: "10", onChange: (e) => updateTeamMembers(e.target.value, dex), required: true }),
            React.createElement("br", null),
            "PHONE NUMBER:",
            " ",
            React.createElement("input", { type: "tel", id: "phone", name: "phone", pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}", required: true, onChange: (e) => updateTeamPhone(e.target.value, dex) }),
            React.createElement("small", null, "Format: 123-456-7890"),
            React.createElement("br", null)));
    });
    const teamStatus = (0, react_query_1.useQuery)("teams", async () => {
        const data = await (0, apiUtils_1.fetchTeamsByHunt)(state.hunt._id);
        return data[0].teams;
    });
    const saveTeams = async () => {
        const { data } = await (0, apiUtils_1.createTeams)(state.hunt._id, teams);
        dispatch((0, teamsReducer_1.setTeams)(data[0].teams));
        setTeamsExist(true);
        return;
    };
    console.log(teamStatus);
    return (React.createElement("div", null,
        !teamsExist ? (React.createElement(React.Fragment, null,
            React.createElement("section", null, "Create your teams below."),
            React.createElement("br", null),
            React.createElement("span", null,
                React.createElement("div", null, "How many teams?"),
                React.createElement("input", { type: "number", onChange: (e) => setTeamNum(+e.target.value) })))) : null,
        React.createElement("br", null),
        !teamsExist ? (React.createElement("span", null, mappedTeamTemplates)) : (React.createElement("span", null,
            teamStatus.isLoading && React.createElement("p", null, "Loading Teams..."),
            teamStatus.status === "success" &&
                teamStatus.data.map((el) => {
                    return (React.createElement("div", { key: el._id },
                        React.createElement("h4", null,
                            "MEMBERS: ",
                            React.createElement("em", null, el.members.join(", "))),
                        React.createElement("p", null,
                            "Last Clue Sent: ",
                            React.createElement("em", null, el.lastClue_sent)),
                        React.createElement("p", null,
                            "Recal Message Sent: ",
                            React.createElement("em", null, el.recall_sent ? "Yes" : "No"))));
                }))),
        !teamsExist && saveReady && (React.createElement("button", { onClick: saveTeams }, "Save Teams"))));
};
exports.default = TeamsPage;
