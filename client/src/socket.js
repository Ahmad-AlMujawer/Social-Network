import {
    chatMessagesReceived,
    chatMessageReceived,
} from "./redux/friends/slice.js";
import { io } from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) =>
            store.dispatch(chatMessagesReceived(msgs))
        );

        socket.on("chatMessage", (msg) =>
            store.dispatch(chatMessageReceived(msg))
        );
    }
};
