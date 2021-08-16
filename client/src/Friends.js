import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FriendButton } from "./FriendButton";
import axios from "axios";
import {
    receiveFriendsAndWannabees,
    acceptFriendRequest,
    unfriend,
} from "./redux/friends/slice";

export function Friends() {
    const dispatch = useDispatch();

    const friends = useSelector((state) => {
        console.log("state inside useSelector: ", state);
        return (
            state.friends.friendsAndWannabees &&
            state.friends.friendsAndWannabees.filter(({ accepted }) => accepted)
        );
    });
    console.log("friends: ", friends);

    const wannabees = useSelector((state) => {
        return (
            state.friends.friendsAndWannabees &&
            state.friends.friendsAndWannabees.filter(
                ({ accepted }) => !accepted
            )
        );
    });
    console.log("wannabees: ", wannabees);
    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/friends-and-wanabees");
            console.log("data in axios /friends: ", data);
            dispatch(receiveFriendsAndWannabees(data));
        })();
    }, []);

    return (
        <div>
            <h2>Friends</h2>

            <div>
                {friends &&
                    friends.map((friend) => (
                        <div key={friend.id}>
                            <img
                                src={friend.imageurl || "/default.jpg"}
                                alt={`${friend.first} ${friend.last}`}
                            />
                            <p>
                                {friend.first} {friend.last}
                            </p>
                            <button
                                onClick={() => dispatch(unfriend(friend.id))}
                            >
                                unfriend
                            </button>
                        </div>
                    ))}
                {/* {friends.length == 0 && <p>you dont have any friends yet</p>} */}
            </div>
            <div>
                {wannabees &&
                    wannabees.map((wannabe) => (
                        <div key={wannabe.id}>
                            <img
                                src={wannabe.imageurl || "/default.jpg"}
                                alt={`${wannabe.first} ${wannabe.last}`}
                            />
                            <p>
                                {wannabe.first} {wannabe.last}
                            </p>
                            <button
                                onClick={() =>
                                    dispatch(acceptFriendRequest(wannabe.id))
                                }
                            >
                                Accept Friend
                            </button>
                        </div>
                    ))}
                {/* {wannabees.length == 0 && <p>there is no friend requests</p>} */}
            </div>
        </div>
    );
}
