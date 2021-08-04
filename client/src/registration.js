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
            },
            console.log("this.state in Registration handleChange: ", this.state)
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
                    <div className="birthday">
                        <input
                            type="date"
                            id="birthday"
                            name="birthday"
                            onChange={this.handleChange}
                            required
                        />
                        <select name="gender">
                            <option defaultValue>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Divers">other</option>
                        </select>
                    </div>

                    <button onClick={(e) => this.handleSubmit(e)}>
                        Signup
                    </button>
                    <p>
                        Already registered? <Link to="/login">login</Link>
                    </p>
                </form>
            </section>
        );
    }
}
