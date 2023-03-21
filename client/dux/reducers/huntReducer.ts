import { createSlice } from "@reduxjs/toolkit";

export const initialState = {};

const huntSlice = createSlice({
  name: "hunt",
  initialState,
  reducers: {
    setHunt(state, action) {
      return action.payload;
    },
  },
});

export const { setHunt } = huntSlice.actions;
export default huntSlice.reducer;
