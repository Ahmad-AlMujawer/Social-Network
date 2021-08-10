import { Logo } from "./logo";
export function ProfilePic({ first, last, imageurl, toggleModal }) {
    imageurl = imageurl || "default.png";
    return (
        <div className="ProfilePic_container">
            <img
                className="profile-pic"
                src={imageurl}
                alt={first && last}
                onClick={toggleModal}
            />
        </div>
    );
}
