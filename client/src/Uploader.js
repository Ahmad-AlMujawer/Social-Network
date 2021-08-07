import { Component } from "react";
import axios from "axios";

export class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        console.log("props in Uploader: ", props);
        this.methodInUploader = this.methodInUploader.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log("Uploader mounted!!!");
    }

    methodInUploader() {
        var formData = new FormData();
        formData.append("file", this.state.file);
        console.log("formaData: ", formData);

        axios
            .post("/upload", formData)
            .then((resp) => {
                this.props.methodInApp(resp.data.imageurl);
            })
            .catch((err) => console.log("error in axios /upöoad: ", err));
        // this is where you'll be doing formdata to send your image to the server!!
        // look back at ib for a nice little refresher.
        // once the img has been successfully added to the db and you get the image back here, you'll want to send the image UP TO APP - you can do so by calling the method in App
        // this method in App was passed down to uploader!
        // also make sure that you hide the uploader!
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
            <div className="uploader">
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
