import axios from "axios";

export function friendsAndWannabeesReducer(state = {}, action) {
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
        return state.filter((friend) => {
            return friend.id != action.payload.id;
        });
    }

    return state;
}

export function receiveFriendsAndWannabees(fnw) {
    return {
        type: "friends/received",
        payload: fnw,
    };
}

export function acceptFriendRequest(id) {
    return async (dispatch) => {
        const { data } = await axios.post(`/friendship/${id}`, {
            buttonText: "Accept Friend Request",
        });
        dispatch({
            type: "friends/accepted",
            payload: id,
        });
    };
}

export function unfriend(id) {
    return async (dispatch) => {
        const { data } = await axios.post(`/friendship/${id}`, {
            buttonText: "End Friendship / Unfriend",
        });

        dispatch({
            type: "friends/unfriended",
            payload: id,
        });
    };
}
