import express from "express";
const app = express();
import path from "path";

app.set("view engine", "ejs");

import Database from "better-sqlite3";
const regex_problems = new Database("database/regex_problems.db", { verbose: console.log });
regex_problems.pragma("journal_mode = WAL");

import bodyParser from "body-parser";
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
		elo INTEGER DEFAULT 400, 
		times_attempted INTEGER DEFAULT 0,
		times_solved INTEGER DEFAULT 0,
		time_created INTEGER DEFAULT (strftime('%s', 'now'))
	);

	CREATE VIRTUAL TABLE IF NOT EXISTS Problems_fts USING fts5(
		title,
		creator,
		content='Problems',
		content_rowid='problem_id'
	);

	CREATE TRIGGER IF NOT EXISTS problems_ai AFTER INSERT ON Problems BEGIN
		INSERT INTO Problems_fts(rowid, title, creator)
		VALUES (new.problem_id, new.title, new.creator);
	END;

	CREATE TRIGGER IF NOT EXISTS problems_ad AFTER DELETE ON Problems BEGIN
		INSERT INTO Problems_fts(Problems_fts, rowid, title, creator)
		VALUES ('delete', old.problem_id, old.title, old.creator);
	END;

	CREATE TRIGGER IF NOT EXISTS problems_au AFTER UPDATE ON Problems BEGIN
		INSERT INTO Problems_fts(Problems_fts, rowid, title, creator)
		VALUES ('delete', old.problem_id, old.title, old.creator);
		INSERT INTO Problems_fts(rowid, title, creator)
		VALUES (new.problem_id, new.title, new.creator);
	END;

	CREATE TABLE IF NOT EXISTS Attempts(
		attempt_id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT NOT NULL,
		problem_id INTEGER NOT NULL,
		tries INTEGER DEFAULT 0,
		time_submitted INTEGER DEFAULT (strftime('%s', 'now')),
		FOREIGN KEY (username) REFERENCES Users(username),
		FOREIGN KEY (problem_id) REFERENCES Problems(problem_id)
	);

	CREATE TABLE IF NOT EXISTS Users(
		[username] TEXT PRIMARY KEY UNIQUE NOT NULL,
		[password] TEXT NOT NULL,
		elo INTEGER DEFAULT 400,
		time_created INTEGER DEFAULT (strftime('%s', 'now'))
	);

`);

app.use(express.static(path.join(__dirname, "public")));

import session from "express-session";
declare module "express-session" {
	interface SessionData {
		user: { username: string};
	}
}

const sessionMiddleware = session({
	// date +%s%N | sha512sum
	secret: "7f8b901b7b70580f29b1e64296c3ba20e0dc17a29bf50b9eba302e3688cb12b1f666569ae6b412a43d63af9ffa5400833fdac5e1c30abdd8e1a94c06a665dd6b",

	resave: false,
	saveUninitialized: false,
});

let cookiePerm: boolean = true;
if (cookiePerm == true) {
	app.use(sessionMiddleware);
}

app.use((req, res, next) => {
	console.log("User: " + req.session.user);
	next();
});

app.use("/", router);

const port = 8000;
app.listen(port, () => {
	try {
		console.log("Server's started at http://localhost:8000");
	} catch (err) {
		console.log(err);
	}
});
