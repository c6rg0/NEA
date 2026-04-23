import sqlite3 from "better-sqlite3";

export function DBSetup(){
	try {
		const DB = new sqlite3("db/db.db", { verbose: console.log });
		DB.pragma("journal_mode = WAL \n");
		
		DB.exec(`
			CREATE TABLE IF NOT EXISTS Users(
				-- The primary key is string, helps reduce the number of SQL queries required
				username TEXT PRIMARY KEY UNIQUE NOT NULL,
				password TEXT NOT NULL,
				elo INTEGER DEFAULT 400,
				time_created INTEGER DEFAULT (strftime('%s', 'now'))
				-- time is in milliseconds since the UNIX epoch (1/1/1970); UNIX time
			);

			CREATE TABLE IF NOT EXISTS Problems(
				problem_id INTEGER PRIMARY KEY AUTOINCREMENT,
				title TEXT NOT NULL,
				creator TEXT NOT NULL,
				instruction TEXT NOT NULL,
				test_data TEXT NOT NULL, -- Test case a users solution is used against
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

			CREATE TRIGGER IF NOT EXISTS fts_insert AFTER INSERT ON Problems BEGIN
				INSERT INTO Problems_fts(rowid, title, creator)
				VALUES (new.problem_id, new.title, new.creator);
			END;

			CREATE TRIGGER IF NOT EXISTS fts_delete AFTER DELETE ON Problems BEGIN
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
					-- ON DELETE CASCADE
				FOREIGN KEY (problem_id) 
					REFERENCES Problems(problem_id)
					-- Removes attempts on problems that were deleted
					ON DELETE CASCADE
			);
		`);

		return;

	} catch (error) {
		console.log("Critical db schema error: \n");
		console.log(error + "\n");
		console.log("Exiting process.");
		process.exit(1); 
		// 1 is a C-style failure code
	}
}
