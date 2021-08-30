import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";
import { Link } from "react-router-dom";
import "moment-timezone";
import Moment from "react-moment";

export function Chat() {
    const messagesContainer = useRef();
    const [message, setMessage] = useState("");
    const chatMessages = useSelector((state) => {
        return state && state.messages;
    });
    useEffect(() => {
        if (chatMessages) {
            messagesContainer.current.scrollTop =
                messagesContainer.current.scrollHeight -
                messagesContainer.current.clientHeight;
        }
    }, [chatMessages]);
    if (!chatMessages) {
        return null;
    }

    const sendMessage = (e) => {
        if (e.key === "Enter" || e.type == "click") {
            socket.emit("newMesage", message);
            e.target.value = "";
        }
    };

    return (
        <>
            <h1>Chat Room</h1>
            <div ref={messagesContainer} id="messages_container">
                {chatMessages &&
                    chatMessages.map((message) => (
                        <div key={message} className="user_message">
                            <Link
                                to={"/user/" + message.user_id}
                                target="_blank"
                            >
                                <p>
                                    {message.first} {message.last}
                                </p>
                            </Link>
                            <div className="user_in_chat">
                                <img src={message.imageurl || "default.png"} />

                                <div>
                                    <p className="message_text">
                                        {message.message_text}
                                    </p>{" "}
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                <div id="chat_container">
                    <textarea
                        className="chat_input_field"
                        placeholder="say hi 🖐️"
                        cols="70"
                        rows="8"
                        onKeyDown={sendMessage}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button
                        onClick={(e) => {
                            sendMessage(e);
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </>
    );
    
}
