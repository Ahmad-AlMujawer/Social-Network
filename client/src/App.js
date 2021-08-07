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
            imageurl: "",
            uploaderIsVisible: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.methodInApp = this.methodInApp.bind(this);
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
                    imageurl: resp.data.imageurl,
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

    // this fn is responsible for receiving your imageurl from uploader
    // and then storing it to its state
    methodInApp(imageurl) {
        console.log(
            "methodInApp is running! Argument passed to it is --> ",
            imageurl
        );
        this.setState({
            imageurl: imageurl,
        });
        // this.toggleModal();
    }

    render() {
        return (
            <div>
                <Logo />
                <a href="/logout">Logout</a>
                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    age={this.state.age}
                    imageurl={this.state.imageurl}
                />
                <div className="togglemodal_container">
                    <button className="toggle_btn" onClick={this.toggleModal}>
                        📷
                    </button>

                    {this.state.uploaderIsVisible && (
                        <Uploader methodInApp={this.methodInApp} />
                    )}
                </div>
            </div>
        );
    }
}
