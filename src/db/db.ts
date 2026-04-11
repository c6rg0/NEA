import sqlite3 from "better-sqlite3";

export function DBSetup(){
	const DB = new sqlite3("db/db.db", { verbose: console.log });
	DB.pragma("journal_mode = WAL");

	// No error handling here because: 
	// If an error occurs, it happens instantly after running 
	// the app, stopping execution, and since the website is 
	// built around the client <-> server <-> db model, 
	// letting this thing carry on would be a crime.

	DB.exec(`
		CREATE TABLE IF NOT EXISTS Users(
			-- The primary key is string, helps reduce the number of SQL queries requried
			username TEXT PRIMARY KEY UNIQUE NOT NULL,
			password TEXT NOT NULL,
			elo INTEGER DEFAULT 400,
			time_created INTEGER DEFAULT (strftime('%s', 'now'))
			-- time is in seconds since the UNIX epoch (1/1/1970)
		);

		CREATE TABLE IF NOT EXISTS Problems(
			problem_id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL,
			creator TEXT NOT NULL,
			instruction TEXT NOT NULL,
			example TEXT NOT NULL, -- Test case a users solution is used against
			answer TEXT NOT NULL,
			elo INTEGER DEFAULT 400, 
			times_attempted INTEGER DEFAULT 0,
			times_solved INTEGER DEFAULT 0,
			time_created INTEGER DEFAULT (strftime('%s', 'now'))
		);

		-- https://www.sqlite.org/fts5.html
		CREATE VIRTUAL TABLE IF NOT EXISTS Problems_fts USING fts5(
			title,
			creator,
			content='Problems', -- Points to the table it's based on,
			content_rowid='problem_id' -- and the primary key of that table.
		);

		-- Triggers get run if triggered...
		-- These exist to insert/delete problems to/in the FTS table automatically.
		CREATE TRIGGER IF NOT EXISTS problems_ai AFTER INSERT ON Problems BEGIN
			INSERT INTO Problems_fts(rowid, title, creator)
			VALUES (new.problem_id, new.title, new.creator);
		END;

		CREATE TRIGGER IF NOT EXISTS problems_ad AFTER DELETE ON Problems BEGIN
			INSERT INTO Problems_fts(Problems_fts, rowid, title, creator)
			VALUES ('delete', old.problem_id, old.title, old.creator);
		END;

		CREATE TABLE IF NOT EXISTS Attempts(
			attempt_id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL,
			problem_id INTEGER NOT NULL,

			-- 0 = false, 1 = true
			solved INTEGER DEFAULT 0,

			tries INTEGER DEFAULT 1,
			time_submitted INTEGER DEFAULT (strftime('%s', 'now')),
			FOREIGN KEY (username) 
				REFERENCES Users(username)
				ON DELETE CASCADE
			FOREIGN KEY (problem_id) 
				REFERENCES Problems(problem_id)
				ON DELETE CASCADE
		);
	`);

	return;
}
