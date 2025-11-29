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
	try {
		console.log("Server's started at http://localhost:8000");
	} catch (err) {
		console.log(err);
	}
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
	res.redirect("/login");
})

app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'login.html'));
})

app.get("/login-success", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'login-success.html'));
	res.redirect("/");
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
	const user_input = req.body;
	console.log("request:", user_input);
	if (!user_input || !user_input.name) {
		console.log("400: Password is required");
		console.log();
	}
	else{
		// SQL logic below:
		const insert = quiz_db.prepare('INSERT INTO Meta (name) VALUES(@name);');
		// Using (@name), the statement worked, 
		// the value is [null] though... until I changed the html lol
		insert.run({ name: user_input.name});
		console.log("Data inserted successfully");
		console.log();
		res.redirect('/signup/content');
	}
});

app.post('/submit-signup', (req, res) => {
	account_db.prepare("PRAGMA table_info(Meta)").all();
	const user_input = req.body;
	console.log("request:", user_input);
	if (!user_input || !user_input) {
		console.log("400: Password is required");
		console.log();
	}

	if (!user_input || !user_input) {
		console.log("400: Password is required");
		console.log();
	}
	
	// THIS IS ALL WORKING //
	const existing_user = account_db.prepare(`SELECT username FROM Logins WHERE username = ?`).get(user_input.username);
	if (existing_user) {
		console.log("409: Username already exists");
		console.log();
		res.redirect("/signup");
	}
	else{
		const insert = account_db.prepare(`
			INSERT INTO Logins (username, password) VALUES
				(@username , @password);`);
		try {
			insert.run({ username: user_input.username, password: user_input.password});
		} catch (err) {
			console.log(err);
			console.log();
		}
		console.log("New login inserted successfully!");
		console.log();
		res.redirect('/signup-success');
	}
});

app.post('/submit-login', (req, res) => {
	account_db.prepare("PRAGMA table_info(Meta)").all();
	const user_input = req.body;
	console.log("request:", user_input);
	if (!user_input || !user_input.username) {
		console.log("400: Username is required");
		console.log();
	}
	if (!user_input || !user_input.password) {
		console.log("400: Password is required");
		console.log();
	}
	
	interface userPassword {
		password: string;
	}

	const result = account_db.prepare
	(`SELECT password FROM Logins WHERE username = ?`)
	.get(user_input.username) as userPassword | undefined;
	
	const db_password = result?.password; // Parses 
	// the output of result

	console.log("Database password:");
	console.log(db_password);
	console.log("User password:");
	console.log(user_input.password);

	if (db_password == user_input.password) {
		console.log("Login success!");
		console.log();
		res.redirect("/login-success");
	} else {
		console.log("401: Incorrect");
		console.log();
		res.redirect("/login");
	}
})






