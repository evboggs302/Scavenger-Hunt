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

// const SET_USER = "SET_USER";
// const SET_FOLLOWING = "SET_FOLLOWING";
// const SET_OTHER_PERSON = "SET_OTHER_PERSON";

// export default function userReducer(state = initialState, action) {
//   switch (action.type) {
//     case SET_USER:
//       return { ...state, user: action.payload };
//     case SET_FOLLOWING:
//       return { ...state, following: action.payload };
//     case SET_OTHER_PERSON:
//       return { ...state, otherPerson: action.payload };
//     default:
//       return state;
//   }
// }

// export function setUser(user) {
//   return {
//     type: SET_USER,
//     payload: user,
//   };
// }

// export function setFollowing(following) {
//   return {
//     type: SET_FOLLOWING,
//     payload: following,
//   };
// }

// export function setOtherPerson(info) {
//   return {
//     type: SET_OTHER_PERSON,
//     payload: info,
//   };
// }
