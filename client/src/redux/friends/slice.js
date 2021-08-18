export function friendsAndWannabeesReducer(state = {}, action) {
    // console.log("action in slice: ", action);
    if (action.type === "friends/received") {
        state = {
            ...state,
            friendsAndWannabees: action.payload,
        };
    }

    if (action.type === "friends/accepted") {
        state = state.map((friendRequest) => {
            if (friendRequest.id === action.payload.id) {
                return {
                    ...friendRequest,
                    accepted: true,
                };
            } else {
                return friendRequest;
            }
        });
    }
    if (action.type === "friends/unfriended") {
        state = state.map((friend) => {
            if (friend.id === action.payload.id) {
                return {
                    ...friend,
                    accepted: false,
                };
            } else {
                return friend;
            }
        });
    }

    console.log("state in slice: ", state);
    return state;
}

export function receiveFriendsAndWannabees(fnw) {
    return {
        type: "friends/received",
        payload: fnw,
    };
}

export function acceptFriendRequest(id) {
    return {
        type: "friends/accepted",
        payload: id,
    };
}

export function unfriend(id) {
    return {
        type: "friends/unfriended",
        payload: id,
    };
}

