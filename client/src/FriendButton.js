import { useState, useEffect } from "react";
import axios from "axios";

export function FriendBtn({ otherUserId }) {
    const [buttonText, setButtonText] = useState("");
    // console.log("buttonText in FriendButtno: ", buttonText);
    // console.log("otherUserId in FriendButtno: ", otherUserId);
    useEffect(() => {
        let abort = false;
        (async () => {
            try {
                const { data } = await axios.get(
                    `/checkFriendStatus/${otherUserId}`
                );
                if (!abort) {
                    setButtonText(data.buttonText);
                }
            } catch (err) {
                abort = true;
            }
        })();
        return () => {
            console.log("otherUserId in return fn: ", otherUserId);
            abort = true;
        };
    }, [otherUserId]);

    const handleClick = async () => {
        console.log("handleclick mounted :)");
        const { data } = await axios.post(`/friendship/${otherUserId}`, {
            buttonText: buttonText,
        });
        setButtonText(data.buttonText);
        console.log("data from handleClick in axios post: ", data);
    };

    return (
        <div>
            <button className="btn" onClick={() => handleClick()}>
                {buttonText}
            </button>
        </div>
    );
}
