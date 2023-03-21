"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_query_1 = require("react-query");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const ResponseTile_1 = require("./ResponseTile");
const apiUtils_1 = require("../../../utils/apiUtils");
require("./Resp.scss");
const ResponsesPage = () => {
    const state = (0, react_redux_1.useAppSelector)((state) => state);
    let history = (0, react_router_dom_1.useHistory)();
    (0, react_1.useEffect)(() => {
        if (!state.hunt._id) {
            history.push("/");
        }
    }, []);
    const responses = (0, react_query_1.useQuery)({
        queryKey: "responses",
        queryFn: async () => {
            const data = await (0, apiUtils_1.fetchResponses)(state.hunt._id);
            console.log(data);
            return data[0].allResponses;
        },
        refetchInterval: 1000,
    });
    const markCorrect = (response_id) => {
        return (0, apiUtils_1.markResponseCorrect)(response_id);
    };
    const sendHintInstead = async (response_id, team_id, hint) => {
        return (0, apiUtils_1.sendHint)(response_id, team_id, hint);
    };
    return (React.createElement("div", null,
        React.createElement("h3", null, "Responses PAGE"),
        React.createElement("br", null),
        responses.isLoading && React.createElement("h5", null, "Fetching Responses..."),
        React.createElement("div", { className: "responseContainer" }, responses.status === "success" &&
            responses.data.map((resp, dex) => {
                return !resp.correct && !resp.hintSent ? (React.createElement(ResponseTile_1.default, { key: resp._id, response: resp, index: dex, markCorrect: markCorrect, sendHint: sendHintInstead })) : null;
            }))));
};
exports.default = ResponsesPage;
