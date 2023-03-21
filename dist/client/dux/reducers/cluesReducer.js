"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setClues = exports.initialState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.initialState = [];
const cluesSlice = (0, toolkit_1.createSlice)({
    name: "clues",
    initialState: exports.initialState,
    reducers: {
        setClues(state, action) {
            return action.payload;
        },
    },
});
exports.setClues = cluesSlice.actions.setClues;
exports.default = cluesSlice.reducer;
