import { createSlice } from "@reduxjs/toolkit";

export const initialState = [];
const cluesSlice = createSlice({
  name: "clues",
  initialState,
  reducers: {
    setClues(state, action) {
      return action.payload;
    },
  },
});

export const { setClues } = cluesSlice.actions;
export default cluesSlice.reducer;
