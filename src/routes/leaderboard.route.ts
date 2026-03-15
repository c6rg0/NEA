import express from "express";
const router = express.Router();

import Database from "better-sqlite3";
const regex_problems = Database("./database/regex_problems.db", { verbose: console.log });

declare module "express-session" {
	interface SessionData {
		user: { username: string };
	}
}

router.get("/", (req, res) => {

	const attempts = regex_problems.prepare(`
		SELECT * FROM Attempts 
		JOIN Problems ON Attempts.problem_id = Problems.problem_id
		ORDER BY elo DESC
		LIMIT 50;
	`);

	const attempts_result = attempts.all();

	res.render("leaderboard", { attempts: attempts_result });

});

export default router;
