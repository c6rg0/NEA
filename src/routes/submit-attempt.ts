import express from "express";
const router = express.Router();

import Database from 'better-sqlite3';
const regex_problems = Database('./database/regex_problems.db', { verbose: console.log });

declare module 'express-session' {
	interface SessionData {
		user: { username: string };
	}
}

router.post('/:id', async (req, res) => {
	const id  = req.params.id;
	let user = req.session.user;
	let correct = req.body;

	const update_attempts = regex_problems.prepare('UPDATE problems SET times_attempted = times_attempted + 1 WHERE problem_id = (@id);');
	update_attempts.run({id: id});

	if (user || correct == true) {
		try {
			const update_attempts = regex_problems.
				prepare('UPDATE problems SET times_solved = times_solved + 1 WHERE problem_id = (@id);');
			update_attempts.run({id: id});
			return res.status(200).send("Successfully updated attempts and added completion!");
		} catch (error) {
			console.log(error);
			return res.status(500).send("Something has gone wrong (HTTP 500)");
		}
	} else {
		return res.status(200).send("Successfully updated attempts!");
	}
});

export default router;
