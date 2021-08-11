import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("user clicked Signup");
        console.log("this.state in Registration handleSubmit: ", this.state);
        axios
            .post("/register", this.state)
            .then((resp) => {
                if (resp.data.success) {
                    // console.log("resp in my if register: ", resp);
                    location.reload();
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("error in POST /register:", err);
                this.setState({
                    error: true,
                });
            });
    }
    handleChange({ target }) {
        // console.log("handerChange input for: ", target.name);
        // console.log("user input value: ", target.value);
        this.setState(
            {
                [target.name]: target.value,
            }
            // console.log("this.state in Registration handleChange: ", this.state)
        );
    }
    render() {
        return (
            <section>
                <form className="input_box">
                    {this.state.error && (
                        <h3 style={{ color: "aquamarine" }}>
                            {this.state.error} Somthing went wrong!! Please try
                            it nochmal 😄
                        </h3>
                    )}
                    <div className="username">
                        <input
                            name="first"
                            placeholder="First Name"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            name="last"
                            placeholder="Last Name"
                            onChange={this.handleChange}
                            required
                        />
                    </div>
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

                    <input
                        type="number"
                        name="age"
                        min="14"
                        max="120"
                        placeholder="Age"
                        onChange={this.handleChange}
                        required
                    />

                    <button onClick={(e) => this.handleSubmit(e)}>
                        Signup
                    </button>
                    <p>Already registered?</p>
                    <button className="btn_0">
                        <Link to="/login">login</Link>
                    </button>
                </form>
            </section>
        );
    }
}
