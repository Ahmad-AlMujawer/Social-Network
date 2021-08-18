import { Component } from "react";
import axios from "axios";

export class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false,
            draftBio: props.bio || "",
        };
        this.textareaToggle = this.textareaToggle.bind(this);
        this.updateBio = this.updateBio.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // console.log("props in BioEditor: ", props);
    }

    textareaToggle() {
        this.setState({
            editorIsVisible: !this.state.editorIsVisible,
            draftBio: this.props.bio,
        });
    }

    async updateBio() {
        try {
            const { data } = await axios.post("/updateBio", this.state);
            this.props.updateBioInApp(data.bio);
            this.setState({ editorIsVisible: false });
        } catch (err) {
            console.log("error in axios /updateBio : ", err);
        }
    }
    handleChange({ target }) {
        this.setState({
            bio: target.value,
        });
    }

    render() {
        if (this.state.editorIsVisible) {
            return (
                <div className="BioEditor">
                    <textarea
                        cols="30"
                        rows="4"
                        name="bio"
                        defaultValue={this.props.bio}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.updateBio}>📝 </button>
                </div>
            );
        } else
            return (
                <div className="BioEditor">
                    <p>{this.props.bio}</p>

                    <button
                        onClick={() => this.setState({ editorIsVisible: true })}
                    >
                        📝
                    </button>
                </div>
            );
    }
}
