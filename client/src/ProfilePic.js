export function ProfilePic({ first, last, imageUrl, age }) {
    imageUrl = imageUrl || "default.png";
    return (
        <div>
            <h2>Im in charge of rendering something!</h2>
            <h3>
                Hi my name is {first} {last} and Im {age} years old!
            </h3>
            <img className="profile-pic" src={imageUrl} alt="image " />
        </div>
    );
}
