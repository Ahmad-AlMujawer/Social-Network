import { useState, useEffect } from "react";
import axios from "axios";

export function FindPeople() {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let abort = false;
        (async () => {
            try {
                if (searchTerm) {
                    const { data } = await axios.get(
                        `api/findPeople/${searchTerm}`
                    );
                    // console.log(
                    //     "data in /findPeople we're looking for: ",
                    //     data
                    // );
                    setUsers(data);
                } else {
                    const { data } = await axios.get(`/api/findPeople/name`);
                    // console.log("data in /findPeople/name Recentusers: ", data);

                    if (!abort) {
                        setUsers(data);
                        // console.log("im seeing !abort", abort);
                    }
                }
            } catch (err) {
                console.log("error in axios findePeople: ", err);
                abort = true;
            }
        })();
        return () => {
            // console.log("searchTerm in my return fn: ", searchTerm);
            // console.log("abort in my return fn: ", abort);
            abort = true;
        };
    }, [searchTerm]);
    return (
        <div className="findPeople_container">
            <h1>I can see content in finde People</h1>
            <input
                name="searchuser"
                defaultValue={searchTerm}
                placeholder="Search People"
                autoComplete="off"
                onChange={({ target }) => {
                    setSearchTerm(target.value);
                }}
            />

            {users.length &&
                users.map((user) => (
                    <div key={user.id}>
                        <img
                            src={user.imageurl || "/default.jpg"}
                            alt={`${user.first} ${user.last}`}
                        />
                        <p>
                            {user.first} {user.last}
                        </p>
                    </div>
                ))}
        </div>
    );
}
