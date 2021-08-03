import { Component } from "react";
import axios from "axios";
export class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: true,
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
                    console.log("resp: ", resp);
                    // stuff worked well with registering we want to do sth
                    // that sth is trigger a reload, so that our start.js runs
                    // one more time and asks the server agin whether or not
                    // the user has the correct cookie :)
                } else {
                    this.setState({
                        error: true,
                    });
                    // we should render an error!
                    // we need to update our component's state to conditionally
                    // make an error appear
                }
            })
            .catch((err) => {
                console.log("error in POST /register:", err);
                this.setState({
                    error: true,
                }); // we need to update our component's state to conditionally
                // make an error appear
            });
    }
    handleChange({ target }) {
        console.log("handerChange input for: ", target.name);
        console.log("user input value: ", target.value);
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
                    <input
                        name="first"
                        placeholder="First Name"
                        onChange={this.handleChange}
                    />
                    <input
                        name="last"
                        placeholder="Last Name"
                        onChange={this.handleChange}
                    />
                    <input
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <button onClick={(e) => this.handleSubmit(e)}>
                        Signup
                    </button>
                </form>
            </section>
        );
    }
}
