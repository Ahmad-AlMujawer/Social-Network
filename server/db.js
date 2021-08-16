const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialNetwork"
);
//--------------------------------------------------------------------------------------

module.exports.register = (first, last, email, hashed_password) => {
    return db.query(
        `INSERT INTO users (first, last, email, hashed_password)
        VALUES ($1, $2, $3, $4) RETURNING id`,
        [first, last, email, hashed_password]
    );
};

module.exports.getLoginInfo = (email) => {
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
};
//------------------------------Reset Password---------------------------------------

module.exports.storeRestCode = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes (email, code) VALUES ($1, $2) RETURNING id`,
        [email, code]
    );
};
//----------------------------
module.exports.verifyCode = (code) => {
    return db.query(
        `SELECT * FROM reset_codes WHERE code=$1 AND CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'`,
        [code]
    );
};
//----------------------------
module.exports.resetPassword = (email, hashed_password) => {
    return db.query(`UPDATE users SET hashed_password=$2 WHERE email=$1`, [
        email,
        hashed_password,
    ]);
};
//----------------------------getUser-------------------------------------------------------

module.exports.getUser = (id) => {
    return db.query(`SELECT * FROM users WHERE id=$1`, [id]);
};
//----------------------------
module.exports.getOtherUser = (id) => {
    return db.query(
        `
    SELECT first, last, imageurl, bio
    FROM users
    WHERE id=$1`,
        [id]
    );
};
//----------------------PrfoilePic & Bio-------------------------------------------------------------

module.exports.addProfilePic = (imageurl, id) => {
    return db.query(
        `UPDATE users SET imageurl=$1 WHERE id=$2 RETURNING imageurl`,
        [imageurl, id]
    );
};
//----------------------------
module.exports.addBio = (bio, id) => {
    return db.query(
        `
    UPDATE users 
    SET bio = $1
    WHERE id = $2
    RETURNING bio`,
        [bio, id]
    );
};
//---------------------------search users-----------------------------------------

module.exports.getRecentUsers = () => {
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 3`);
};
//----------------------------
module.exports.getMatchingUsers = (val) => {
    return db.query(
        `SELECT * FROM users 
        WHERE (first || ' ' || last) ILIKE $1`,
        [val + "%"]
    );
};

//---------------------------Friendship Query----------------------------------------

module.exports.checkFriendStatus = (userId, otherUserId) => {
    console.log("getting checkFriendStatus from db");
    return db.query(
        `SELECT * FROM friendships
         WHERE (recipient_id = $1 AND sender_id = $2)
         OR (recipient_id = $2 AND sender_id = $1)`,
        [userId, otherUserId]
    );
};
//---------------------------
module.exports.sendFriendRequest = (userId, otherUserId) => {
    return db.query(
        `INSERT INTO friendships (sender_id, recipient_id)
         VALUES ($1, $2)`,
        [userId, otherUserId]
    );
};
//---------------------------
module.exports.acceptFriendRequest = (userId, otherUserId) => {
    return db.query(
        `UPDATE friendships SET accepted = true
         WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)`,
        [userId, otherUserId]
    );
};
//---------------------------
module.exports.cancel_deleteFriendRequest = (userId, otherUserId) => {
    return db.query(
        `DELETE FROM friendships
         WHERE (recipient_id = $1 AND sender_id = $2)
         OR (recipient_id = $2 AND sender_id = $1)`,
        [userId, otherUserId]
    );
};
//--------------------------------------------------------------------------------------
module.exports.friendsAndWannabees = (id) => {
    return db.query(
        `SELECT users.id, first, last, imageurl, accepted 
         FROM friendships JOIN users on
                        (accepted = FALSE AND recipient_id = $1 AND sender_id = users.id)
                    OR  (accepted = TRUE AND recipient_id = $1 AND sender_id = users.id)
                    OR  (accepted = TRUE AND sender_id = $1 AND recipient_id = users.id)
    
    `,
        [id]
    );
};
//--------------------------------------------------------------------------------------
