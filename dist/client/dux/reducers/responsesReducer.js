"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUser = exports.initialState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.initialState = {
    user: null,
    following: null,
    otherPerson: [],
};
const userSlice = (0, toolkit_1.createSlice)({
    name: "user",
    initialState: exports.initialState,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
    },
});
exports.setUser = userSlice.actions.setUser;
exports.default = userSlice.reducer;
