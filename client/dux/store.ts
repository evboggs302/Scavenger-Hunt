import { configureStore } from "@reduxjs/toolkit";
import userReducer, { initialState as userState } from "./reducers/userReducer";
import huntReducer, { initialState as huntState } from "./reducers/huntReducer";
import teamsReducer, {
  initialState as teamsState,
} from "./reducers/teamsReducer";
import cluesReducer, {
  initialState as cluesState,
} from "./reducers/cluesReducer";
// import responsesReducer, {
//   initialState as responsesState,
// } from "./reducers/responsesReducer";

export const initialState = {
  user: userState,
  hunt: huntState,
  teams: teamsState,
  clues: cluesState,
  // responses: responsesState,
};

const store = configureStore({
  reducer: {
    user: userReducer,
    hunt: huntReducer,
    teams: teamsReducer,
    clues: cluesReducer,
    // responses: responsesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
