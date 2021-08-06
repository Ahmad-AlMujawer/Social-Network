import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export class RestPassword extends Component {
    constructor() {
        super();
        this.state = {
            view: 1,
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange({ target }) {
        this.setState(
            {
                [target.name]: target.value,
            },
            console.log("this.state in RestPassword: ", this.state)
        );
    }
    handleSubmit() {
        const { view } = this.state;
        if (view === 1) {
            axios
                .post("/password/reset/start ", this.state)
                .then((resp) => {
                    if (resp.data.success) {
                        return this.setState({ view: 2 });
                    } else {
                        return this.setState({ error: true });
                    }
                })
                .catch((err) => {
                    console.log(
                        "error in axios POST /password/reset/start: ",
                        err
                    );
                    return this.setState({ error: true });
                });
        } else if (view === 2) {
            axios
                .post("/password/reset/verify ", this.state)
                .then((resp) => {
                    if (resp.data.success) {
                        return this.setState({ view: 3, error: false });
                    } else {
                        return this.setState({ error: true });
                    }
                })
                .catch((err) => {
                    console.log(
                        "error in axios POST /password/reset/verify: ",
                        err
                    );
                    return this.setState({ error: true });
                });
        }
    }

    determineViewToRender() {
        if (this.state.view === 1) {
            return (
                <div>
                    <div className="input_box">
                        {this.state.error && (
                            <h2 style={{ color: "red" }}>
                                {this.state.error} Somthing went wrong!! Please
                                try it nochmal 😄
                            </h2>
                        )}
                        <input
                            name="email"
                            placeholder="your email adress"
                            onChange={this.handleChange}
                        />
                        <button onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            );
        } else if (this.state.view === 2) {
            return (
                <div className="input_box">
                    {this.state.error && (
                        <h3 style={{ color: "red" }}>
                            Somthing went wrong!! Please try it nochmal 😄
                        </h3>
                    )}
                    <p>
                        an email with a 6 digit verification code has been sent
                        to your email adress. Please enter this code belwo.
                    </p>
                    <input
                        name="code"
                        placeholder="6-digit code"
                        onChange={this.handleChange}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="new password"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleSubmit}>Verify</button>
                    <button>
                        <Link to="/login">Cancel</Link>
                    </button>
                </div>
            );
        } else if (this.state.view === 3) {
            // remember to also add a link to login ;)
            return (
                <div>
                    <h1>
                        You have successfully reset your password.{" "}
                        <Link to="/login">login</Link>
                    </h1>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {/* call the method */}
                {this.determineViewToRender()}
            </div>
        );
    }
}
