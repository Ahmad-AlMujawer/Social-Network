const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/petition"
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
