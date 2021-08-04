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
    handleSubmit(e) {
        e.preventDefault();
        console.log("Login was clicked");
        console.log("this.state in Login handelSubmit: ", this.state);
        axios
            .post("/login", this.state)
            .then((resp) => {
                if (resp.data.success) {
                    console.log("resp in my if login: ", resp);
                    location.reload();
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
        this.setState(
            {
                [target.name]: target.value,
            },
            console.log("this.state in Login handleChange: ", this.state)
        );
    }
    render() {
        return (
            <section>
                {this.state.error && (
                    <h2 style={{ color: "red" }}>
                        {this.state.error} Somthing went wrong!! Please try it
                        nochmal 😄
                    </h2>
                )}
                <form>
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
                    <button onClick={(e) => this.handleSubmit(e)}>Login</button>
                    <p>
                        Not a registered?
                        <Link to="/">register here.</Link>
                    </p>
                    <Link to="/rest-password">forgot your password?</Link>
                </form>
            </section>
        );
    }
}
