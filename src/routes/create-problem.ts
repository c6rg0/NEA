//submit-problem.ts
import express from "express";
const router = express.Router();

import Database from 'better-sqlite3';
const regex_problems = Database('./database/regex_problems.db', { verbose: console.log });

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

router.post('/', (req, res) => {
	const user_input = req.body;
	console.log("request: ", user_input);
	
	// Check if user is loged in with express-session
	if (req.session.user) {
		if (!user_input){
			return res.status(204).send("Title is required");
		} else {
			console.log("session_user: ", req.session.user);
			
			// SQL logic:
			const insert_problem = regex_problems.prepare('INSERT INTO Problems (title, creator, instruction, example, answer) VALUES(@title, @creator, @instruction, @example, @answer;');
			insert_problem.run({ title: user_input.title, creator: req.session.user, instruction: user_input.instruction, example: user_input.example, answer: user_input.answer});
			
			console.log("Data inserted successfully");
			console.log();
			res.redirect('/create-success');
		}
	} else {
		console.log("session_user: []");
		res.status(204).send("Please login first and retry after you're logged in!");
		return;

	}
});

export default router;
