import express from "express";
import { Response, NextFunction } from "express";
const app = express();
import path from "path";

app.set('view engine', 'ejs');

import Database from "better-sqlite3";
const quiz_db = new Database("database/quiz.db", { verbose: console.log });
const account_db = new Database("database/account.db", { verbose: console.log });

quiz_db.pragma("journal_mode = WAL");
account_db.pragma("journal_mode = WAL");

import bodyParser from 'body-parser';
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Master route import:
import router from "./routes/index";

quiz_db.exec(`
	CREATE TABLE IF NOT EXISTS Meta(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		creator TEXT NOT NULL
	);

	CREATE TABLE IF NOT EXISTS Settings(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT UNIQUE NOT NULL,
		value TEXT NOT NULL
	);

	CREATE TABLE IF NOT EXISTS Questions(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		question_text TEXT NOT NULL,
		category TEXT NOT NULL
	);

	CREATE TABLE IF NOT EXISTS Options(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		question_id INTEGER NOT NULL,
		option_text TEXT NOT NULL,
		FOREIGN KEY (question_id) REFERENCES Questions(id)
	);

	CREATE TABLE IF NOT EXISTS Answers(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		question_id INTEGER NOT NULL,
		option_id INTEGER NOT NULL,
		FOREIGN KEY (question_id) REFERENCES Questions(id),
		FOREIGN KEY (option_id) REFERENCES Options(id)
		
	);
`);

account_db.exec(`
	CREATE TABLE IF NOT EXISTS Logins(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		[username] TEXT UNIQUE NOT NULL,
		[password] TEXT NOT NULL
	);
`);

app.use(express.static(path.join(__dirname, 'public')));

import session from "express-session";
declare module "express-session" {
	interface SessionData {
		user: { username: string};
  	}
}

const sessionMiddleware = session({
	secret: 'r278429@!£$dytcvyubn',
	resave: false,
	saveUninitialized: false,
});

let cookiePerm: boolean = true;
if (cookiePerm == true) {
	app.use(sessionMiddleware);
}

app.use((req, res, next) => {
	console.log('Session', req.session);
	next();
});


app.use("/", router);

app.get("/create", (req, res) => {
	res.redirect('/create/name');
});

app.get("/create/name", (req, res) => {
	res.render('create-name', { name: 'create-name' } );
});

app.get("/create/content", (req, res) => {
	res.render('create-content', { name: 'create-content' } );
});

app.get("/account", (req, res) => {
	res.render('account', { name: 'account' } );
});

app.get("/signup", (req, res) => {
	res.render('signup', { name: 'signup' } );
});

app.get("/signup-success", (req, res) => {
	res.redirect("/login");
});

app.get("/login", (req, res) => {
	res.render('login', { name: 'login' } );
});

app.get("/login-success", (req, res) => {
	res.redirect("/");
});

app.get("/disable-cookies", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.error('Error destroying session', err);
			res.send('Error destroying session');
			res.redirect("/account");
		} else {
			res.send('Session destroyed');
			cookiePerm = false;
			res.redirect("/");
		};
	}
)});

app.get("/logout", (req, res) => {
	req.session.user = { username: "" };
});

const port = 8000;
app.listen(port, () => {
	try {
		console.log("Server's started at http://localhost:8000");
	} catch (err) {
		console.log(err);
	}
});
