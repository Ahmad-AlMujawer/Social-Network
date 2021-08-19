import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
        return (
            state.friends.friendsAndWannabees &&
            state.friends.friendsAndWannabees.filter(({ accepted }) => accepted)
        );
    });

    const wannabees = useSelector((state) => {
        return (
            state.friends.friendsAndWannabees &&
            state.friends.friendsAndWannabees.filter(
                ({ accepted }) => !accepted
            )
        );
    });
    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/friends-and-wanabees");
            dispatch(receiveFriendsAndWannabees(data));
        })();
    }, []);

    return (
        <div id="friends_container">
            <h2>Friends</h2>

            <div className="friends_list">
                {friends &&
                    friends.map((friend) => (
                        <div key={friend.id} className="friends_box">
                            <Link to={"/user/" + friend.id}>
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
                                    className="btn_in_friends"
                                    onClick={() =>
                                        dispatch(unfriend(friend.id))
                                    }
                                >
                                    Unfriend
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            <div>
                <h2>Wannabees</h2>
                <div className="friends_list">
                    {wannabees &&
                        wannabees.map((wannabe) => (
                            <div key={wannabe.id} className="friends_box">
                                <Link to={"/user/" + wannabe.id}>
                                    <ProfilePic
                                        first={wannabe.first}
                                        last={wannabe.last}
                                        imageurl={
                                            wannabe.imageurl || "/default.jpg"
                                        }
                                    />
                                    <p>
                                        {wannabe.first} {wannabe.last}
                                    </p>
                                </Link>
                                <button
                                    className="btn_in_friends"
                                    onClick={() =>
                                        dispatch(
                                            acceptFriendRequest(wannabe.id)
                                        )
                                    }
                                >
                                    Accept Friend
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
