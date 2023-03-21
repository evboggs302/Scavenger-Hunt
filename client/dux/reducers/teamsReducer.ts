import { createSlice } from "@reduxjs/toolkit";

export const initialState = [];

const userSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setTeams(state, action) {
      return action.payload;
    },
  },
});

export const { setTeams } = userSlice.actions;
export default userSlice.reducer;
