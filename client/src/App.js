import axios from "axios";
import { Component } from "react";
import { Logo } from "./logo";
import { ProfilePic } from "./ProfilePic.js";
import { Uploader } from "./Uploader";
import { Profile } from "./Profile";
import { Link } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { otherProfile } from "./otherProfile.js";
import { FindPeople } from "./FindPeople";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            age: "",
            imageurl: "",
            uploaderIsVisible: false,
            bio: "",
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.methodInApp = this.methodInApp.bind(this);
        this.updateBioInApp = this.updateBioInApp.bind(this);
    }

    componentDidMount() {
        axios
            .get("/user", this.state)
            .then((resp) => {
                // console.log("resp in axios GET /user: ", resp);
                this.setState({
                    first: resp.data.first,
                    last: resp.data.last,
                    age: resp.data.age,
                    imageurl: resp.data.imageurl,
                    bio: resp.data.bio,
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

    methodInApp(imageurl) {
        this.setState({
            imageurl: imageurl,
        });
    }
    updateBioInApp(draftBio) {
        this.setState({ bio: draftBio });
    }

    render() {
        return (
            <BrowserRouter>
                <div id="App_container">
                    <div id="ProfilePic_container">
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            age={this.state.age}
                            imageurl={this.state.imageurl}
                        />
                        <Logo id="navbar_logo" />
                    </div>
                    <nav className="navbar">
                        <div className="navbar_container">
                            <ul className="navbar_menu">
                                <li className="navbar_list">
                                    <a className="navbar_links" href="logout">
                                        Logout
                                    </a>
                                </li>
                                <li className="navbar_list">
                                    <Link to="/" className="navbar_links">
                                        Profile
                                    </Link>
                                </li>
                                <li className="navbar_list">
                                    <Link to="/users" className="navbar_links">
                                        Find People
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div id="togglemodal_container">
                        <button
                            className="toggle_btn"
                            onClick={this.toggleModal}
                        >
                            📷
                        </button>
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                methodInApp={this.methodInApp}
                                methodInUploader={this.toggleModal}
                            />
                        )}
                    </div>

                    <Route
                        exact
                        path="/"
                        render={() => (
                            <div className="profile_container">
                                <Profile
                                    id={this.state.id}
                                    first={this.state.first}
                                    last={this.state.last}
                                    imageurl={this.state.imageurl}
                                    onClick={this.toggleModal}
                                    bio={this.state.bio}
                                    updateBioInApp={this.updateBioInApp}
                                />
                            </div>
                        )}
                    />
                    <Route path="/user/:id" component={otherProfile} />
                    <Route path="/users" component={FindPeople} />
                </div>
            </BrowserRouter>
        );
    }
}
