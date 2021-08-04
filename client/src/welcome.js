import { Registration } from "./registration";
import { Login } from "./login";
import { RestPassword } from "./rest-password";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome!</h1>
            <img src="logo.png" />
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
