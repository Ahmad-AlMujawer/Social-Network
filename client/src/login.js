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
        axios
            .post("/login", this.state)
            .then((resp) => {
                if (resp.data.success) {
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
