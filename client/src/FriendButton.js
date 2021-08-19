import { useState, useEffect } from "react";
import axios from "axios";

export function FriendBtn({ otherUserId }) {
    const [buttonText, setButtonText] = useState("");
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
            abort = true;
        };
    }, [otherUserId]);

    const handleClick = async () => {
        const { data } = await axios.post(`/friendship/${otherUserId}`, {
            buttonText: buttonText,
        });
        setButtonText(data.buttonText);
    };

    return (
        <div>
            <button className="btn" onClick={() => handleClick()}>
                {buttonText}
            </button>
        </div>
    );
}
