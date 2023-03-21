"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTeams = exports.initialState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.initialState = [];
const userSlice = (0, toolkit_1.createSlice)({
    name: "teams",
    initialState: exports.initialState,
    reducers: {
        setTeams(state, action) {
            return action.payload;
        },
    },
});
exports.setTeams = userSlice.actions.setTeams;
exports.default = userSlice.reducer;
