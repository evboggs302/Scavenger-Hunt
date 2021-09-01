import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  following: null,
  otherPerson: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
