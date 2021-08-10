import { ProfilePic } from "./ProfilePic";
import { BioEditor } from "./BioEditor";

export function Profile({
    first,
    last,
    imageurl,
    bio,
    toggleModal,
    updateBioInApp,
}) {
    imageurl = imageurl || "default.png";
    return (
        <div className="Profile_container">
            <div className="ProfilePic_container">
                <ProfilePic
                    first={first}
                    last={last}
                    imageurl={imageurl}
                    toggleModal={() => toggleModal()}
                />
            </div>
            <div className="BioEditor_container">
                <h3>
                    {first} {last}
                </h3>
                <BioEditor
                    first={first}
                    last={last}
                    bio={bio}
                    updateBioInApp={updateBioInApp}
                />
            </div>
        </div>
    );
}
