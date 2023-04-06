import { createSlice } from "@reduxjs/toolkit";

export const initialResponsesState = {
  user: null,
  following: null,
  otherPerson: [],
};

const responsesSlice = createSlice({
  name: "responses",
  initialState: initialResponsesState,
  reducers: {
    setResponses(state, action) {
      return action.payload;
    },
  },
});

export const { setResponses } = responsesSlice.actions;
export default responsesSlice.reducer;
