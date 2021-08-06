const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const { compare, hash } = require("./bc");
const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");

const ses = require("./ses.js");
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
            // console.log("hashedPass in register:  ", hashedPass);

            db.register(first, last, email, hashedPass)
                .then((data) => {
                    req.session.userId = data.rows[0].id;
                    // console.log("my userId in db.register: ", data.rows);
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
    // console.log("req.body in login: ", req.body);
    // hash(password)
    //     .then((hashedPass) => {
    //         console.log("hashedPass in login:  ", hashedPass);
    db.getLoginInfo(email)
        .then((data) => {
            // console.log("data from db.getlogininfo: ", data);
            compare(password, data.rows[0].hashed_password)
                .then((match) => {
                    // console.log("match outside my if stetment :", match);
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
});
//-----------------------------password-reset--------------------------------
app.post("/password/reset/start", (req, res) => {
    const { email } = req.body;
    db.getLoginInfo(email).then((data) => {
        // console.log(
        //     "my email data from db.loginInfo in /start:",
        //     data.rows[0].email
        // );
        if (data.rows[0].email) {
            const secretCode = cryptoRandomString({
                length: 6,
            });
            const emailToUser = `Please use this code to rest the  password for your account.
                Here is your code: ${secretCode}
                This code will expire in 10 minutes!`;
            db.storeRestCode(email, secretCode)
                .then(
                    ses
                        .sendEmail(email, secretCode, emailToUser)
                        .then(res.json({ success: true }))
                        .catch((err) => {
                            console.log("error in sending an email: ", err);
                            res.json({ error: true });
                        })
                )
                .catch((err) => {
                    console.log(
                        "error in getting login info in /password/reset/start: ",
                        err
                    );
                });
        } else {
            res.json({
                success: false,
                error: "Somthing went wrong! Please try again.",
            });
        }
    });
});

//-------------------------------------------------------------
app.post("/password/reset/verfiy", (req, res) => {
    const { resetCode, email, password } = req.body;
    db.verifyCode(email)
        .then((data) => {
            if (resetCode === data.rows[0].secretCode) {
                hash(password)
                    .then((hashedPass) => {
                        db.resetPassword(data.rows[0].email, hashedPass)
                            .then(res.json({ success: true }))
                            .catch((err) => {
                                console.log(
                                    "error in db.resetPassword POST/verfiy: ",
                                    err
                                );
                            });
                    })
                    .catch((err) => {
                        console.log("error in hashedPass POST/verify: ", err);
                        res.json({ success: false });
                    });
            }
        })
        .catch((err) => {
            console.log("error in db.verifyCode POST/verify: ", err);
            res.json({ success: false });
        });
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
