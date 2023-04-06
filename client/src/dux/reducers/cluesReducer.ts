import { createSlice } from "@reduxjs/toolkit";

export const initialCluesState = [];

const cluesSlice = createSlice({
  name: "clues",
  initialState: initialCluesState,
  reducers: {
    setClues(state, action) {
      return action.payload;
    },
  },
});

export const { setClues } = cluesSlice.actions;
export default cluesSlice.reducer;
