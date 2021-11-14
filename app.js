const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const status = require(__dirname + '/Reactjs-minified/src/status.js');
const fs = require('fs');
let streamRead;
let streamWrite;
streamWrite = fs.createWriteStream(__dirname + '/Reactjs-minified/src/status.js');
streamRead = fs.createReadStream(__dirname + '/Reactjs-minified/src/status.js');
streamWrite.write('exports.getStatus = false;');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const usersDB = [
	{
		email: '1@2.com', 
		password: '123'
	}
];

const session = [];

const loggedInUser = [];

app.route('/account')
.post((req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	// console.log(req.query);
	console.log(req);

	usersDB.forEach((user) => {
		if (email === user.email && password === user.password) {
			streamWrite.write('exports.getStatus = true;');
		} else {
			streamWrite.write('exports.getStatus = false;');
		}
	});
	res.redirect('/');
	console.log('Status: ' + status.getStatus);
});
app.post('/logout',(req, res)=>{
	streamWrite.write('exports.getStatus = false;');
	res.redirect('/');
});
// setInterval(()=>console.log(status.getStatus), 1000);
// setInterval(()=>{
// 	streamRead.on('data', (data)=>console.log(data));
// }, 1000);

let port = process.env.PORT;
!port || port == "" ? port = 8080 : null;
app.listen(port, console.log(`Server started on port ${port}`));