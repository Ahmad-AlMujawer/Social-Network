import { Component } from "react";
import { Logo } from "./logo";
import { ProfilePic } from "./ProfilePic.js";
import { Uploader } from "./Uploader";
import axios from "axios";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            age: "",
            imageUrl: "",
            uploaderIsVisible: false,
        };
    }

    // this function runs the second the component is rendered!
    componentDidMount() {
        console.log("App mounted");
        axios
            .get("/user", this.state)
            .then((resp) => {
                console.log("resp in axios GET /user: ", resp);
                this.setState({
                    first: resp.data.first,
                    last: resp.data.last,
                    age: resp.data.age,
                    imageUrl: resp.data.imageUrl,
                });
            })
            .catch((err) => {
                console.log("error in axios GET /user: ", err);
            });
    }

    toggleModal() {
        // console.log("my toggleModal is working");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    // this fn is responsible for receiving your imageUrl from uploader
    // and then storing it to its state
    methodInApp(arg) {
        console.log(
            "methodInApp is running! Argument passed to it is --> ",
            arg
        );
        this.setState({
            imageUrl,
        });
        // make sure you set the imageUrl you received from uploader in state!
    }

    render() {
        return (
            <div>
                <Logo />
                <h1>Hello from App!</h1>

                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    age={this.state.age}
                    imageUrl={this.state.imageUrl}
                />

                <h2 onClick={() => this.toggleModal()}>
                    Click here to toggle uploader visibility
                </h2>

                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </div>
        );
    }
}
