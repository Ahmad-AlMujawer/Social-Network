const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const { compare, hash } = require("./bc");
const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");
const secretCode = cryptoRandomString({
    length: 6,
});
let sessionSecret;
if (process.env.NODE_ENV == "production") {
    sessionSecret = process.env.SESSION_SECRET;
} else {
    sessionSecret = require("../secrets.json").SESSION_SECRET;
}
app.use(
    cookieSession({
        secret: `${sessionSecret}`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(express.json());

// app.get("/welcome", (req, res) => {
//     if (req.session.userId) {
//         res.redirect("/someroute");
//     }else {

//     }
// });
app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});
//-----------------------------register--------------------------------
app.post("/register", (req, res) => {
    const { first, last, email, password } = req.body;

    hash(password)
        .then((hashedPass) => {
            console.log("hashedPass in register:  ", hashedPass);

            db.register(first, last, email, hashedPass)
                .then((data) => {
                    req.session.userId = data.rows[0].id;
                    console.log("my data in db.register: ", data.rows);
                    console.log("userId: ", req.session.userId);
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("error in POST /register in db.register", err);
                    res.json({ error: true });
                });
        })
        .catch((err) => {
            console.log("error in POST /register in hash", err);
            res.json({ error: true });
        });
});
//----------------------------login---------------------------------
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    hash(password)
        .then((hashedPass) => {
            console.log("hashedPass in login:  ", hashedPass);
            db.getLoginInfo(email)
                .then((data) => {
                    compare(password, data.rows[0].hashed_password)
                        .then((match) => {
                            if (match === true) {
                                req.session.userId = data.rows[0].id;
                                res.json({ success: true });
                            } else {
                                res.json({ success: false });
                            }
                        })
                        .catch((err) => {
                            console.log("error in compare:", err);
                            res.json({ error: true });
                        });
                })
                .catch((err) => {
                    console.log("error in getLoginInfo:", err);
                    res.json({ error: true });
                });
        })
        .catch((err) => {
            console.log("error in has in Login", err);
            res.json({ error: true });
        });
});
//-----------------------------password-reset--------------------------------
app.post("/password/reset/start", (req, res) => {
    const { email } = req.body;
});

//-------------------------------------------------------------
app.post("/password/reset/verfiy", (req, res) => {
    const { code, password } = req.body;
});

//-------------------------------------------------------------

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/register");
    return;
});

//-------------------------------------------------------------

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening on port 3001.");
});
