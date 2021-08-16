import { Component } from "react";
import axios from "axios";

export class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };

        console.log("props in Uploader: ", props);
        this.methodInUploader = this.methodInUploader.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    methodInUploader() {
        var formData = new FormData();
        formData.append("file", this.state.file);
        console.log("formaData: ", formData);

        axios
            .post("/upload", formData)
            .then((resp) => {
                console.log("resp in my /upload: ", resp);
                this.props.methodInApp(resp.data.imageurl);
            })
            .catch((err) => console.log("error in axios /upöoad: ", err));
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.files[0],
        });
    }

    closeUploader() {
        this.props.toggleModal();
    }

    render() {
        return (
            <div id="uploader_container">
                <div className="uploader-input">
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={this.handleChange}
                    />
                </div>

                <button onClick={this.methodInUploader}>➕ Upload Photo</button>
            </div>
        );
    }
}
