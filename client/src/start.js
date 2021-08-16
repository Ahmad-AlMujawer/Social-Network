import ReactDOM from "react-dom";
import Welcome from "./welcome";
import axios from "axios";
import { Provider } from "react-redux";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as immutableState from "redux-immutable-state-invariant";
import reducer from "./redux/reducer.js";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

axios.get("/user/id.json").then(function ({ data }) {
    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.querySelector("main")
        );
    }
});
// To make data stored in Redux available to your React components, the first thing you must do is wrap the highest-level component in your app in the Provider component exported by react-redux. You will have to pass your store to Provider as a prop.
