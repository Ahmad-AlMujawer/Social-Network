import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FriendButton } from "./FriendButton";
import axios from "axios";
import { ProfilePic } from "./ProfilePic";
import { Link } from "react-router-dom";

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

            <div className="friends_list">
                {friends &&
                    friends.map((friend) => (
                        <div key={friend.id} className="friends_box">
                            {/* <Comonent key={friend.id} {...friend} /> */}
                            <Link to={"/user/" + friend.id}>
                                {/* <img
                                    src={friend.imageurl}
                                    className="friends_img"
                                /> */}
                                <ProfilePic
                                    first={friend.first}
                                    last={friend.last}
                                    imageurl={friend.imageurl || "/default.jpg"}
                                />
                                <p>
                                    {friend.first} {friend.last}
                                </p>
                            </Link>
                            <div>
                                <button
                                    onClick={() =>
                                        dispatch(unfriend(friend.id))
                                    }
                                >
                                    unfriend
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="friends_list">
                <h2>Wannabees</h2>
                {wannabees &&
                    wannabees.map((wannabe) => (
                        <div key={wannabe.id} className="friends_box">
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
            </div>
        </div>
    );
}
