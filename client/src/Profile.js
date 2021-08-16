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
        <>
            <div id="profile_container">
                <div className="profile_container_pic">
                    <ProfilePic
                        first={first}
                        last={last}
                        imageurl={imageurl}
                        toggleModal={() => toggleModal()}
                    />
                </div>

                <div className="profile_container_bio">
                    <h3>Bio:</h3>
                    <BioEditor
                        first={first}
                        last={last}
                        bio={bio}
                        updateBioInApp={updateBioInApp}
                    />
                </div>
            </div>
            <h3 className="name">{first}</h3>
        </>
    );
}
