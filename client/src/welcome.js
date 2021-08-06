import { Registration } from "./registration";
import { Login } from "./login";
import { RestPassword } from "./rest-password";
import { HashRouter, Route } from "react-router-dom";
import App from "./App";

export default function Welcome() {
    return (
        <div id="welcome">
            <App />

            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/rest-password" component={RestPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
