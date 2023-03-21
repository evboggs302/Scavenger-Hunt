"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHunt = exports.initialState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.initialState = {};
const huntSlice = (0, toolkit_1.createSlice)({
    name: "hunt",
    initialState: exports.initialState,
    reducers: {
        setHunt(state, action) {
            return action.payload;
        },
    },
});
exports.setHunt = huntSlice.actions.setHunt;
exports.default = huntSlice.reducer;
