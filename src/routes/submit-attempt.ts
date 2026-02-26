import express from "express";
const router = express.Router();

import Database from 'better-sqlite3';
const regex_problems = Database('./database/regex_problems.db', { verbose: console.log });

import util from 'node:util';

declare module 'express-session' {
	interface SessionData {
		user: { username: string };
	}
}

function probability(rating1: number, rating2: number) {
	return 1.0 / (1+ Math.pow(10, (rating1 - rating2) / 400.0));
}

function elo_update(rating1: number, rating2: number, k: number, outcome: number){
	// Elo algorithm
	let pb = probability(rating1, rating2);
	let pa = probability(rating2, rating1);
	
	rating1 = rating1 + k * (outcome - pa);
	rating2 = rating2 + k * ((1 - outcome) - pb);

	console.log("Updated elo ratings:")
	console.log("Rating1: ", rating1);
	console.log("Rating2: ", rating2);
	return;
}

interface types{
	elo: number,
	diff: number,
}

router.post('/:id', async (req, res) => {
	const id  = req.params.id;
	let user = req.session.user;
	let correct = req.body;

	console.log("Correct? -> " + correct);
	console.log(util.inspect(req.body, {showHidden: true, depth: null}));

	const update_attempts = regex_problems.
		prepare('UPDATE problems SET times_attempted = times_attempted + 1 WHERE problem_id = (@id);');
	update_attempts.run({id: id});

	if (user || correct == true) {
		try {
			const update_attempts = regex_problems.
				prepare('UPDATE problems SET times_solved = times_solved + 1 WHERE problem_id = (@id);');
			update_attempts.run({id: id});

			// select problem/user elo

			const user_elo = regex_problems.
				prepare('SELECT elo FROM Users WHERE username = ?').
				get(req.session.user) as types;

			const problem_elo = regex_problems.
				prepare('SELECT diff FROM Problems WHERE problem_id = ?').
				get(id) as types;

			let rating1: any = user_elo;
			let rating2: any = problem_elo;
			const k: number = 30;
			let outcome: number = 1;

			elo_update(rating1, rating2, k, outcome);

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
