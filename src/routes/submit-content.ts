//submit-quit-content.ts
import express from "express";
import path from "path";

const router = express.Router();

import Database from 'better-sqlite3';
const quiz_db = Database('database/quiz.db', { verbose: console.log });
const account_db = Database('database/account.db', { verbose: console.log });

router.post('/submit-quiz-metadata', (req, res) => {
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
		// the value was [null] until I changed the html lol
		insert.run({ name: user_input.name});
		console.log("Data inserted successfully");
		console.log();
		res.redirect('/create/content');
	}
});

export default router;
