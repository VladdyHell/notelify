//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(
    cors({
         origin: ["http://localhost:3000", 'http://192.168.42.232:3000'],
         methods: ["GET","PUT","PATCH","POST","DELETE"],
         credentials: true
   })
);

app.use(session({
    secret: process.env.SECRETKEY,
    resave: true,
    saveUninitialized: true,
    // cookie: {
    // 	domain: 'http://localhost:3000'
    // }
}));

app.use(cookieParser(process.env.SECRETKEY));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/usersDB', {useNewUrlParser: true});

const { Schema } = mongoose;

const usersSchema = new Schema({
	username: String,
	email: String,
	password: String,
	notes: Array
});

usersSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', usersSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/checkauth', (req, res) => {
	res.send(req.isAuthenticated());
	console.log(req.isAuthenticated());
});

app.post('/login', async (req, res) => {

	function auth() {
		return new Promise((resolve, reject)=>{
			const { username, password } = req.body;
		    const user = new User({
		        username: username,
		        password: password
		    });
			console.log(user);
			req.logIn(user, err => {
				if (err) {
					reject(err.message);
				} else {
					passport.authenticate('local')(req,res,()=>{
						resolve('Successfully Authenthicated');
					});
				}
			});
		});
	}
	try {
		const res = await auth();
		console.log(res);
	} catch (err) {
		console.log(err);
	}
	console.log('Successfully Executed');
	console.log(req.isAuthenticated());
	res.send(req.isAuthenticated());
});

app.post('/login2', async (req, res, next) => {
    await passport.authenticate('local', async (err, user, info) => {
    	// console.log(user);
        if (err) {
            return next(err);
        }
        if (!user) {
            return console.log(info.message);
        }
        await req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            console.log(req.user);
            return console.log('Successfully Authenticated');
        });
    })(req, res, next);
});

app.post('/logout', (req, res)=>{
	req.logout();
	res.send(req.isAuthenticated());
	console.log(req.isAuthenticated());
});

let port = process.env.PORT;
!port || port == "" ? port = 8080 : null;
app.listen(port, console.log(`Server started on port ${port}`));