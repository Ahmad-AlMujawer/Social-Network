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
        axios
            .post("/register", this.state)
            .then((resp) => {
                if (resp.data.success) {
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
        this.setState(
            {
                [target.name]: target.value,
            }
        );
    }
    render() {
        return (
            <section>
                <form className="regisration_container">
                    {this.state.error && (
                        <h3 style={{ color: "aquamarine" }}>
                            {this.state.error} Somthing went wrong!! Please try
                            it nochmal 😄
                        </h3>
                    )}
                    <div className="input_register">
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
                    </div>
                    <div className="btns_register">
                        <button
                            onClick={(e) => this.handleSubmit(e)}
                            
                        >
                            Signup
                        </button>
                        <br />
                        <p className="p_0">Already registered?</p>
                        <button className="btn_0">
                            <Link to="/login">login</Link>
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}
