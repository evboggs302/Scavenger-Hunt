import { configureStore } from "@reduxjs/toolkit";
import userReducer, { initialState as userState } from "./reducers/userReducer";
import huntReducer, { initialState as huntState } from "./reducers/userReducer";
import teamsReducer, {
  initialState as teamsState,
} from "./reducers/userReducer";
import cluesReducer, {
  initialState as cluesState,
} from "./reducers/userReducer";
import responsesReducer, {
  initialState as responsesState,
} from "./reducers/userReducer";

export const initialState = {
  user: userState,
  hunt: huntState,
  teams: teamsState,
  clues: cluesState,
  responses: responsesState,
};

const store = configureStore({
  reducer: {
    user: userReducer,
    hunt: huntReducer,
    teams: teamsReducer,
    clues: cluesReducer,
    responses: responsesReducer,
  },
});

export default store;
