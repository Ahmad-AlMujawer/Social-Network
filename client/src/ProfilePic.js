import { Logo } from "./logo";
export function ProfilePic({ first, last, imageurl, toggleModal }) {
    imageurl = imageurl || "default.png";
    return (
        <div id="profilePic_container">
            <img
                id="profilePic_img"
                className="image-big"
                src={imageurl}
                alt={first && last}
                onClick={toggleModal}
            />
        </div>
    );
}
