export function ProfilePic({ first, last, imageurl, age }) {
    imageurl = imageurl || "default.png";
    return (
        <div className="ProfilePic_container">
            <img className="profile-pic" src={imageurl} alt={last} />
            <h3>
                {first} {last} {age}
            </h3>
        </div>
    );
}
