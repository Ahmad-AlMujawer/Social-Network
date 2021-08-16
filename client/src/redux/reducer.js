import { combineReducers } from "redux";
import { friendsAndWannabeesReducer } from "./friends/slice";

const rootReducer = combineReducers({
    friends: friendsAndWannabeesReducer,
});

export default rootReducer;
