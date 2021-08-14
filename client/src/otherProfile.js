import { Component } from "react";
import axios from "axios";
import { FriendBtn } from "./FriendButton";

export class otherProfile extends Component {
    constructor(props) {
        // console.log("props in otherProfile: ", props);
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        try {
            const { data } = await axios.get(
                `/api/user/${this.props.match.params.id}`
            );
            // console.log("data in axios api/user/otheruser: ", data);
            if (!data) {
                return this.props.history.push("/");
            } else {
                this.setState({
                    id: data.rows[0].id,
                    frist: data.rows[0].frist,
                    last: data.rows[0].last,
                    imageurl: data.rows[0].imageurl,
                    bio: data.rows[0].bio,
                });
                // console.log("data inside else  : ", data);
            }
        } catch (err) {
            console.log("error in otherProfile: ", err);
        }
        this.setState({ error: true });
    }
    render() {
        return (
            <div className="profile_container otherProfile">
                <img
                    src={this.state.imageurl || "/default.jpg"}
                    alt={`${this.state.first} ${this.state.last}`}
                />

                <div className="BioEditor_container">
                    <h2>
                        {this.state.first} {this.state.last}
                    </h2>
                    <h2>Bio:</h2>
                    <p>{this.state.bio}</p>
                    <FriendBtn otherUserId={this.props.match.params.id} />
                </div>
            </div>
        );
    }
}
