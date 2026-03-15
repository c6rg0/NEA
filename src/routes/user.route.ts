//user.ts
import express from "express";
const router = express.Router();

import Database from 'better-sqlite3';
const regex_problems = Database('./database/regex_problems.db', { verbose: console.log });

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

router.get('/:id', (req, res) => {
	let user = req.params.id;
	
	const userSearch = regex_problems.prepare(`SELECT username, elo FROM Users WHERE username = ?`).get(user);

	const attempts  = regex_problems.prepare(`SELECT * FROM Attempts JOIN Problems ON Attempts.problem_id = Problems.problem_id WHERE Attempts.username = ? LIMIT 10;`);
	const attempts_result = attempts.all(user);

	res.render("user", { results: userSearch, attempts: attempts_result });

});

export default router;
