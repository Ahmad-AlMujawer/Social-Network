import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit() {
        // e.preventDefault(); im not in the form anymoe don't need this
        console.log("Login was clicked");
        // console.log("this.state in Login handelSubmit: ", this.state);
        axios
            .post("/login", this.state)
            .then((resp) => {
                console.log("resp from post login: ", resp);
                if (resp.data.success) {
                    console.log("resp in my if login: ", resp);
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("error in POST /login:", err);
                this.setState({ error: true });
            });
    }
    handleChange({ target }) {
        // console.log("handleChange input for: ", target.name);
        // console.log("user input value: ", target.value);
        this.setState({
            [target.name]: target.value,
        });
    }
    render() {
        return (
            <section className="login_fadein">
                <div className="login_container">
                    {this.state.error && (
                        <h3 style={{ color: "tomato" }}>
                            Somthing went wrong!! Please try again 😄
                        </h3>
                    )}
                    <div className="input_login">
                        <input
                            name="email"
                            placeholder="Email"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            name="password"
                            placeholder="Password"
                            type="password"
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="login_btns">
                        <div>
                            <button
                                onClick={(e) => this.handleSubmit(e)}
                                className="btn-"
                            >
                                Login
                            </button>
                            <button className="btn_0">
                                <Link to="/">sign up</Link>
                            </button>
                        </div>
                        <div className="login-div2">
                            <Link to="/rest-password">
                                ▶️ forgot your password?
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
