"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const userReducer_1 = require("./reducers/userReducer");
const huntReducer_1 = require("./reducers/huntReducer");
const teamsReducer_1 = require("./reducers/teamsReducer");
const cluesReducer_1 = require("./reducers/cluesReducer");
// import responsesReducer, {
//   initialState as responsesState,
// } from "./reducers/responsesReducer";
exports.initialState = {
    user: userReducer_1.initialState,
    hunt: huntReducer_1.initialState,
    teams: teamsReducer_1.initialState,
    clues: cluesReducer_1.initialState,
    // responses: responsesState,
};
const store = (0, toolkit_1.configureStore)({
    reducer: {
        user: userReducer_1.default,
        hunt: huntReducer_1.default,
        teams: teamsReducer_1.default,
        clues: cluesReducer_1.default,
        // responses: responsesReducer,
    },
});
exports.default = store;
