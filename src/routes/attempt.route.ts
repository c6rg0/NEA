import express from "express";
const router = express.Router();

import Database from 'better-sqlite3';
const regex_problems = Database('./database/regex_problems.db', { verbose: console.log });

declare module 'express-session' {
	interface SessionData {
		user: { username: string };
	}
}

interface types{
	elo: number,
	diff: number,
	urlId: number,
}

function probability(userElo: any, problemElo: any) {
	console.log();
	console.log("Prob r:")
	console.log("userElo: ", userElo.elo);
	console.log("problemElo: ", problemElo.diff);

	return 1.0 / (1+ Math.pow(10, (userElo.elo - problemElo.diff) / 400.0));
}

function eloUpdate(userElo: any, problemElo: any){
	const k: number = 30;
	let outcome: number = 1;

	// Elo algorithm
	let pb = probability(userElo, problemElo);
	let pa = probability(userElo, problemElo);

	userElo = userElo.elo + k * (outcome - pa);
	problemElo = problemElo.diff + k * ((1 - outcome) - pb);

	console.log("Updated elo ratings:")
	console.log("userElo: ", userElo);
	console.log("problemElo: ", problemElo);
	return [userElo, problemElo];
}

router.post('/', async (req, res) => {
	try {
		let user = req.session.user;
		let attempt = req.body;

		const updateAttempts = regex_problems.
			prepare('UPDATE problems SET times_attempted = times_attempted + 1 WHERE problem_id = (@id);');
		updateAttempts.run({id: attempt.urlId});
		console.log("Path 1");

		if (attempt.correct == true) {
			const updateSolved = regex_problems.
				prepare('UPDATE Problems SET times_solved = times_solved + 1 WHERE problem_id = (@id);');
			updateSolved.run({id: attempt.urlId});
			console.log("Path 2");
		}

		if (user){
			let userElo = regex_problems.
				prepare('SELECT elo FROM Users WHERE username = ?').
				get(req.session.user) as types;

			let problemElo = regex_problems.
				prepare('SELECT diff FROM Problems WHERE problem_id = ?').
				get(attempt.urlId) as types;

			// [object Object]NaN
			const [newUserElo, newProblemElo] = eloUpdate(userElo, problemElo);

			const userEloUpdate = regex_problems.
				prepare('UPDATE Users SET elo = (@userElo) WHERE user_id = (@user);');
			userEloUpdate.run({userElo: newUserElo, user: user});

			const problemEloUpdate = regex_problems.
				prepare('UPDATE Problems SET diff = (@diff) WHERE problem_id = (@id);');
			problemEloUpdate.run({diff: newProblemElo, id: attempt.urlId});

			console.log("Path 3");
		}

		return res.status(200).send("Success.");

	} catch (error) {
		console.log(error);
		return res.status(500).send("HTTP CODE 500 D:");
	}
});

export default router;
