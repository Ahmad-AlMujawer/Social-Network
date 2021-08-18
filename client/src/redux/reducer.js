import { combineReducers } from "redux";
import { friendsAndWannabeesReducer } from "./friends/slice";
import { messagesReducer } from "./messages/slice";

const rootReducer = combineReducers({
    friends: friendsAndWannabeesReducer,
    messages: messagesReducer,
});

export default rootReducer;
