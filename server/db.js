const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialNetwork"
);

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

module.exports.verifyCode = (code) => {
    return db.query(
        `SELECT * FROM reset_codes WHERE code=$1 AND CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'`,
        [code]
    );
};

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
//-----------------------------------------------------------------------------------
