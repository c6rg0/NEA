//submit-title.ts
import express from "express";
import path from "path";
const router = express.Router();

import Database from 'better-sqlite3';
const quiz_db = Database('database/quiz.db', { verbose: console.log });
const account_db = Database('database/account.db', { verbose: console.log });

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

router.post('/', (req, res) => {
	const user_input = req.body;
	console.log("request:", user_input);
	
	// Check if user is loged in with express-session
	if (req.session.user) {
		if (!user_input){
			return res.status(204).send("Title is required");
		} else {
			// SQL logic:
			quiz_db.prepare("PRAGMA table_info(Meta)").all();
			const insert = quiz_db.prepare('INSERT INTO Meta (name, creator) VALUES(@name, @creator);');
			insert.run({ name: user_input.title, creator: req.session.user});
			console.log("Data inserted successfully");
			console.log();
			res.redirect('/create-content');
		}
	} else {
		res.status(204).send("Please login first and retry after you're logged in!");
		return;
	}
});

export default router;
