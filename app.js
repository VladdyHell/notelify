//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const DEBUG = false;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://localhost:3000", "http://192.168.42.232:3000"],
        methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(
    session({
        secret: process.env.SECRETKEY,
        resave: true,
        saveUninitialized: true,
        // cookie: {
        // 	domain: 'http://localhost:3000'
        // }
    })
);

// app.use(cookieParser(process.env.SECRETKEY));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/usersDB", {
    useNewUrlParser: true,
});

const { Schema } = mongoose;

const usersSchema = new Schema({
	name: String,
    username: String,
    // email: String,
    password: String,
    notes: Array,
});

usersSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", usersSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/checkauth", (req, res) => {
    res.send([req.isAuthenticated(), req.user]);
    DEBUG && console.log(req.isAuthenticated());
});

app.post("/login", (req, res, next) => {
	const { rememberpass } = req.body;
	DEBUG && console.log('Remember: '+rememberpass);
    passport.authenticate("local", (err, user, info) => {
        // DEBUG && console.log(user);
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send([info.message]);
        }

        if (rememberpass) {
        	DEBUG && console.log('Session Saved');
        	req.session.cookie.maxAge = 2592000000;
        } else {
        	DEBUG && console.log('Session Unsaved');
        	req.session.cookie.expires = false;
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            DEBUG && console.log(req.user);
            return res.send(["Successfully Authenticated"]);
        });
    })(req, res, next);
});

app.post('/register', (req, res, next) => {
	const user = {
		name: req.body.user,
		username: req.body.username
	}
	DEBUG && console.log(user);
	User.register(user, req.body.password, (err, user) => {
			if (err) return res.send([err.message]);
			passport.authenticate('local')(req, res, () => {
				DEBUG && console.log(`Created new user ${req.body.username}`);
				return res.send(['Successfully Registered']);
			});
	});
});

app.post("/logout", (req, res) => {
    req.logout();
    res.send(req.isAuthenticated());
    DEBUG && console.log(req.isAuthenticated());
});

let port = process.env.PORT;
!port || port == "" ? (port = 8080) : null;
app.listen(port, console.log(`Server started on port ${port}`));
