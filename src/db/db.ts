import sqlite3 from "better-sqlite3";

export function dbSetup(){
	const db = new sqlite3("db/db.db", { verbose: console.log });
	db.pragma("journal_mode = WAL");

	db.exec(`
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

	return;
}
