import { configureStore } from "@reduxjs/toolkit";
import userReducer, { initialUserState } from "./reducers/userReducer";
import huntReducer, { initialHuntState } from "./reducers/huntReducer";
import teamsReducer, {
  initialTeamsState
} from "./reducers/teamsReducer";
import cluesReducer, {
  initialCluesState
} from "./reducers/cluesReducer";
// import responsesReducer, {
//   initialResponsesState
// } from "./reducers/responsesReducer";

export const initialState = {
  user: initialUserState,
  hunt: initialHuntState,
  teams: initialTeamsState,
  clues: initialCluesState,
  // responses: initialResponsesState,
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
