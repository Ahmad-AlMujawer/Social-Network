export function messagesReducer(state = [], action) {

    if (action.type == "GET/lastMessages") {
        state = action.payload;
    }

    if (action.type == "GET/newMessage") {
        state = [...state, action.payload.msg];
    }
    return state;
}

export function chatMessagesReceived(msgs) {
    return {
        type: "GET/lastMessages",
        payload: msgs,
    };
}

export function chatMessageReceived(msg) {
    return {
        type: " GET/newMessage",
        payload: msg,
    };
}
