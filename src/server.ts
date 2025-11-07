import express = require('express');
const app = express();
import path = require('path');

import bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

import Database = require('better-sqlite3');
const quiz_db = new Database('database/quiz.db', { verbose: console.log });
const account_db = new Database('database/account.db', { verbose: console.log });

quiz_db.pragma('journal_mode = WAL');
account_db.pragma('journal_mode = WAL');

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 8000;
app.listen(PORT, () => {
	console.log("Server's started at http://localhost:8000");
})

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get("/browse", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'browse.html'));
})

app.get("/create", (req, res) => {
	res.redirect('/create/name');
})

app.get("/create/name", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'create.html'));
})

app.get("/create/content", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'create-content.html'));
})

app.get("/play", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'play.html'));
})

app.get("/account", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'account.html'));
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
	quiz_db.prepare("PRAGMA table_info(Meta)").all();
	const temp = req.body;
	console.log("request:", req.body);
	if (!temp || !temp.name) {
		return res.status(400).json({ error: "Name is required" });
	}
	else{
		// SQL logic below:
		const insert = quiz_db.prepare('INSERT INTO Meta (name) VALUES(@name);');
		// Using (@name), the statement worked, 
		// the value is [null] though... until I changed the html lol
		insert.run({ name: temp.name});
		console.log("Data inserted successfully");
		res.redirect('/signup/content');
	}
});

app.post('/submit-signup', (req, res) => {
	account_db.prepare("PRAGMA table_info(Meta)").all();
	const temp = req.body;
	console.log("request:", req.body);
	if (!temp || !temp.username) {
		return res.status(400).json({ error: "Username is required" });
	}

	if (!temp || !temp.password) {
		return res.status(400).json({ error:"Password is required" });
	}
	
	const value = account_db.prepare(`SELECT username FROM Logins WHERE username = ?`).get(temp.username);
	if (value) {
		console.log("Username already exists; please try again!");
		res.redirect("/signup");
	}
	else{
		const insert = account_db.prepare(`
			INSERT INTO Logins (username, password) VALUES
				(@username , @password);`);
		try {
			insert.run({ username: temp.username, password: temp.password});
		} catch (err) {
			console.log(err);
		}
		console.log("Data inserted successfully");
		res.redirect('/signup-success');
	}
});

