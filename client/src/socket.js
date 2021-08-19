import {
    chatMessagesReceived,
    chatMessageReceived,
} from "./redux/messages/slice.js";
import { io } from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("Last10Messages", (msgs) =>
            store.dispatch(chatMessagesReceived(msgs))
        );

        socket.on("Last10Messages", (msg) =>
            store.dispatch(chatMessageReceived(msg))
        );
    }
};
