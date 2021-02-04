import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  //   message: messageReducer,
  //   posts: postsReducer,
  //   marketplace: marketplaceReducer,
  //   skills: skills,
  //   rooms: roomReducer,
});

export default createStore(rootReducer);
