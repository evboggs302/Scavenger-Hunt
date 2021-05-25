import { configureStore } from "@reduxjs/toolkit";
import userReducer, { initialState as userState } from "./reducers/userReducer";

export const initialState = {
  user: userState,
};

const store = configureStore({
  reducer: {
    user: userReducer,
    //   message: messageReducer,
    //   posts: postsReducer,
    //   marketplace: marketplaceReducer,
    //   skills: skills,
    //   rooms: roomReducer,
  },
});

export default store;
