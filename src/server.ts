import express from "express";

// If the below import doesn't cause errors after being 
// commented out, delete it:
// import { Response, NextFunction } from "express"; 

const app = express();
import path from "path";

app.set('view engine', 'ejs');

import Database from "better-sqlite3";
const regex_problems = new Database("database/regex_problems.db", { verbose: console.log });
regex_problems.pragma("journal_mode = WAL");

import bodyParser from 'body-parser';
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Master route import:
import router from "./routes/index";

regex_problems.exec(`
	CREATE TABLE IF NOT EXISTS Problems(
		problem_id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
		creator TEXT NOT NULL,
		instruction TEXT NOT NULL,
		example TEXT NOT NULL,
		answer TEXT NOT NULL,
		test TEXT NOT NULL,
		diff INTEGER DEFAULT 0, 
		times_attempted INTEGER DEFAULT 0,
		times_solved INTEGER DEFAULT 0,
		time_created INTEGER DEFAULT (strftime('%s', 'now'))

	);

	CREATE TABLE IF NOT EXISTS Attempts(
		attempt_id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		problem_id INTEGER NOT NULL,
		solved BOOLEAN NOT NULL,
		time_taken INTEGER,
		time_submitted INTEGER,
		FOREIGN KEY (user_id) REFERENCES Users(user_id),
		FOREIGN KEY (problem_id) REFERENCES Problem(problem_id) ON DELETE CASCADE
	);

	CREATE TABLE IF NOT EXISTS Users(
		user_id INTEGER PRIMARY KEY AUTOINCREMENT,
		[username] TEXT UNIQUE NOT NULL,
		[password] TEXT NOT NULL
	);

`);

// CREATE INDEX IF NOT EXISTS idx_link_problem ON Link(problem_id);

app.use(express.static(path.join(__dirname, 'public')));

import session from "express-session";
declare module "express-session" {
	interface SessionData {
		user: { username: string};
  	}
}

const sessionMiddleware = session({
	// date +%s%N | sha512sum
	secret: '7f8b901b7b70580f29b1e64296c3ba20e0dc17a29bf50b9eba302e3688cb12b1f666569ae6b412a43d63af9ffa5400833fdac5e1c30abdd8e1a94c06a665dd6b',

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
	res.render('create');
});

app.get("/create-success", (req, res) => {
	res.render('create-success');
});

app.get("/account", (req, res) => {
	res.render('account');
});

app.get("/signup", (req, res) => {
	res.render('signup');
});

app.get("/signup-success", (req, res) => {
	res.redirect("/login");
});

app.get("/login", (req, res) => {
	res.render('login' );
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
