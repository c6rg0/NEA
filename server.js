const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite');

let db = new sqlite3.Database(":memory:", (err) => {
	if(err){
		console.log("Error occured -" + err.message);
	} else {
		console.log("Database connected");
	}
})

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get("/browse", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'browse.html'));
})

app.get("/play", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'play.html'));
})

app.get("/create", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'create.html'));
})

const PORT = 8000;
app.listen(PORT, () => {
	console.log("Servers started");
})
