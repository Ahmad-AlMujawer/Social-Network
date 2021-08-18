export function messagesReducer(state = {}, action) {
    // console.log("action in slice: ", action);

    if (action.type == "GET/lastMessages") {
        state = action.payload.mgs;
    }

    if (action.type == "GET/newMessage") {
        state = [...state, action.payload.msg];
    }
    return state;
}

export function chatMessagesReceived(msgs) {
    return {
        type: "GET/lastMessages",
        msgs: { msgs },
    };
}

export function chatMessageReceived(msg) {
    return {
        type: " GET/newMessage",
        msg: { msg },
    };
}
