const express = require('express');
const app = express();
const sqlite3 = require('sqlite');

let db = new sqlite3.Database(":memory:", (err) => {
	if(err){
		console.log("Error occured -" + err.message);
	} else {
		console.log("Database connected");
	}
})

app.get("/", (req, res) => {
	res.sendFile('/home/gabriel/Code/NEA/index.html');
	app.use(express.static(__dirname + '/'));
})

app.get("/browse.html", (req, res) => {
	res.sendFile('/home/gabriel/Code/NEA/browse.html');
	app.use(express.static(__dirname + '/'));
})

app.get("/play.html", (req, res) => {
	res.sendFile('/home/gabriel/Code/NEA/play.html');
	app.use(express.static(__dirname + '/'));
})

app.get("/create.html", (req, res) => {
	res.sendFile('/home/gabriel/Code/NEA/create.html');
	app.use(express.static(__dirname + '/'));
})

app.listen(4000, () => {
	console.log("Servers started");
})
