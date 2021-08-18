import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";
import { Link } from "react-router-dom";
// import { chatMessagesReceived } from "./redux/messages/slice";

export function Chat() {
    // console.log("Chat component is mounted!");
    const messagesContainer = useRef();
    const [message, setMessage] = useState("");
    const chatMessages = useSelector((state) => {
        console.log("state inside chat useSelector: ", state);

        state && state.chatMessages;
    });
    // const dispatch = useDispatch();
    useEffect(() => {
        console.log("chatMessages inside useEffect: ", chatMessages);
        if (chatMessages) {
            messagesContainer.current.scrollTop =
                messagesContainer.current.scrollHeight -
                messagesContainer.current.clientHeight;
        }
    }, [chatMessages]);
    // if (!chatMessages) {
    //     return null;
    // }

    const sendMessage = (e) => {
        console.log("my message value: ", message);
        if (e.key === "Enter" || e.type === "click") {
            socket.emit("newMesage", message);
            e.target.value = "";
        }
    };
    console.log("newMesage : ", message);

    // var date = new Date();
    // var ukDate = new Intl.DateTimeFormat("en-GB", {
    //     dateStyle: "long",
    //     timeStyle: "short",
    // }).format(date);

    return (
        <div ref={messagesContainer}>
            <h1>Chat Room</h1>
            {chatMessages &&
                chatMessages.map((message) => (
                    <div key={message.id}>
                        <Link to={"/user/" + message.user_id}>
                            <div>
                                <p>
                                    {message.first} {message.last}
                                </p>
                                <img src={message.imageurl || "default.jpg"} />
                            </div>
                        </Link>

                        <p>{message.message_text}</p>
                        <p>{message.timestamp}</p>
                    </div>
                ))}
            <div id="chat_container">
                <textarea
                    className="chat_input_field"
                    placeholder="say hi 🖐️"
                    cols="40"
                    rows="20"
                    onKeyDown={sendMessage}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button onClick={(e) => sendMessage(e)}>Send</button>
            </div>
        </div>
    );
}
