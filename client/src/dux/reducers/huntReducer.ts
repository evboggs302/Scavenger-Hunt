import { createSlice } from "@reduxjs/toolkit";

export const initialHuntState = {};

const huntSlice = createSlice({
  name: "hunt",
  initialState: initialHuntState,
  reducers: {
    setHunt(state, action) {
      return action.payload;
    },
  },
});

export const { setHunt } = huntSlice.actions;
export default huntSlice.reducer;
