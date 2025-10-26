import express = require('express');
const app = express();

import path = require('path');

import bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

import Database = require('better-sqlite3');
const quiz_db = new Database('public/database/quiz.db', { verbose: console.log });
const account_db = new Database('public/database/account.db', { verbose: console.log });

quiz_db.pragma('journal_mode = WAL');
account_db.pragma('journal_mode = WAL');

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 8000;
app.listen(PORT, () => {
	console.log("Server's started at http://localhost:8000");
})

// Setting up the different parts of my website
// Example: "/play" -> "http://localhost:8000/play"
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

app.get("/account", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'account.html'));
})

app.get("/signup", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'signup.html'));
})


app.get("/signup", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'signup.html'));
})

app.get("/signup-success", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'signup-success.html'));
})

app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'login.html'));
})

quiz_db.exec(`
	CREATE TABLE IF NOT EXISTS Meta(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT,
		creator TEXT
	);

	CREATE TABLE IF NOT EXISTS Settings(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT UNIQUE,
		value TEXT
	);

	CREATE TABLE IF NOT EXISTS Questions(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		question_text TEXT,
		category TEXT
	);

	CREATE TABLE IF NOT EXISTS Options(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		question_id INTEGER,
		option_text TEXT,
		FOREIGN KEY (question_id) REFERENCES Questions(id)
	);

	CREATE TABLE IF NOT EXISTS Answers(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		question_id INTEGER,
		option_id INTEGER,
		FOREIGN KEY (question_id) REFERENCES Questions(id),
		FOREIGN KEY (option_id) REFERENCES Options(id)
		
	);
`);

account_db.exec(`
	CREATE TABLE IF NOT EXISTS Logins(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		[username] TEXT UNIQUE,
		[password] TEXT
	);
`);

app.post('/submit-quiz-metadata', (req, res) => {
	const columns = quiz_db.prepare("PRAGMA table_info(Meta)").all();
	const temp = req.body;
	console.log(temp);
	if (!temp || !temp.name) {
		return res.status(400).json({ error: "Name is required" });
	}
	else{
		// SQL logic below:
		const insert = quiz_db.prepare('INSERT INTO Meta (name) VALUES(@name);');
		// Using (@name), the statement worked, 
		// the value is [null] though...
		insert.run({ name: temp.name});
		console.log("Data inserted successfully");
	}
});

