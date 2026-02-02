//submit-quit-content.ts
import express from "express";
import path from "path";

const router = express.Router();

import Database from 'better-sqlite3';
const regex_problems = Database('./database/regex_problems.db', { verbose: console.log });

router.post('/submit-quiz-metadata', (req, res) => {
	const user_input = req.body;
	console.log("request:", user_input);
	if (!user_input || !user_input.name) {
		console.log("400: Password is required");
		console.log();
	}
	else{
		// SQL logic below:

		// name and @name are palceholders, use src/server.ts for reference,
		// in this case you'll be inputing the description, examples and answer
		
		const insert = regex_problems.prepare('INSERT INTO Problems (name) VALUES(@name);');
		// Using (@name), the statement worked, 
		// the value was [null] until I changed the html lol
		insert.run({ name: user_input.name});
		console.log("Data inserted successfully");
		console.log();
		res.redirect('/create/content');
	}
});

export default router;
