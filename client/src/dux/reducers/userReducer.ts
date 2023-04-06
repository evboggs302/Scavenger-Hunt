import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  _id: string;
  user_name: string;
  first_name: string;
  last_name: string;
};

export const initialUserState: UserState = {
  _id: "",
  user_name: "",
  first_name: "",
  last_name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
