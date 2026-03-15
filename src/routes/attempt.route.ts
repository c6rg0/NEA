import express from "express";
const router = express.Router();

import Database from "better-sqlite3";
const regex_problems = Database("./database/regex_problems.db", { verbose: console.log });

declare module "express-session" {
	interface SessionData {
		user: { username: string };
	}
}

interface types{
	elo: number,
	urlId: number,
}

class Elo {
	private diff: number = 30;
	private outcome: number = 1;
	public winner: number = 0;
	public loser: number = 0;

	newDiff(winner: any, loser: any){
		// I would need winnerDiff and loserDiff; 
		// no clue how that would work lol.
	}

	probability(winner: any, loser: any){
		return 1.0 / (1+ Math.pow(10, (winner.elo - loser.elo) / 400.0));
	}

	updateElo(winner: any, loser: any){
		let pb = this.probability(winner, loser);
		let pa = this.probability(winner, loser);

		this.winner  = winner.elo + this.diff * (this.outcome - pa);
		this.loser = loser.elo + this.diff * ((1 - this.outcome - pb));
	}
}

class Attempts{
	increment(attempt: any){
		const updateAttempts = regex_problems.prepare(`
			UPDATE problems 
			SET times_attempted = times_attempted + 1 
			WHERE problem_id = (@id);
		`);

		updateAttempts.run({id: attempt.urlId});

		if (attempt.correct == true) {
			const updateSolved = regex_problems.prepare(`
				UPDATE Problems 
				SET times_solved = times_solved + 1 
				WHERE problem_id = (@id);
			`);

			updateSolved.run({id: attempt.urlId});
		}
	}
	
	record(user: any, attempt: any){
		console.log(attempt.correct);

		if (attempt.correct == true){
			const newAttempt  = regex_problems.prepare(`
				INSERT INTO Attempts(username, problem_id, tries)
				VALUES(@username, @problem_id, @tries);
			`);

			newAttempt.run({username: user, problem_id: attempt.urlId, tries: 1});

		} else if (attempt.correct == false){
			return;
		}
	}

}

router.post("/", async (req, res) => {
	try {
		let user = req.session.user;
		console.log(user);
		let attempt = req.body;

		let A = new Attempts();
		A.increment(attempt);

		let winner: number | unknown;
		let loser: number | unknown;
		let newUserElo: number | unknown;
		let newProbElo: number | unknown;

		if (user){
			let userElo = regex_problems.prepare(`
				SELECT elo FROM Users 
				WHERE username = ?
			`).get(user) as types;

			let problemElo  = regex_problems.prepare(`
				SELECT elo FROM Problems 
				WHERE problem_id = ?`
			).get(attempt.urlId) as types;
	
			if (attempt.correct == true){
				winner = userElo;
				loser = problemElo;
			} else if (attempt.correct == false){
				loser = userElo;
				winner = problemElo;
			}

			const E = new Elo();
			E.updateElo(winner, loser);

			const userEloUpdate = regex_problems.prepare(`
				UPDATE Users 
				SET elo = (@userElo) 
				WHERE username = (@user);
			`);

			const problemEloUpdate = regex_problems.prepare(`
				UPDATE Problems 
				SET elo = (@elo) 
				WHERE problem_id = (@id);
			`);

			if (attempt.correct == true){
				userEloUpdate.run({userElo: E.winner, user: user});
				problemEloUpdate.run({elo: E.loser, id: attempt.urlId});
				newUserElo = E.winner;
				newProbElo = E.loser;

			} else if (attempt.correct == false){
				userEloUpdate.run({userElo: E.loser, user: user});
				problemEloUpdate.run({elo: E.winner, id: attempt.urlId});
				newUserElo = E.loser;
				newProbElo = E.winner;
			}

			A.record(user, attempt);

		}

		return res.status(200).send("Success.");

	} catch (error) {
		console.log(error);
		return res.status(500).send("HTTP CODE 500 D:");
	}
});

export default router;
