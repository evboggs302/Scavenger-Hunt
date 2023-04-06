import { createSlice } from "@reduxjs/toolkit";

export const initialTeamsState = [];

const teamsSlice = createSlice({
  name: "teams",
  initialState: initialTeamsState,
  reducers: {
    setTeams(state, action) {
      return action.payload;
    },
  },
});

export const { setTeams } = teamsSlice.actions;
export default teamsSlice.reducer;
