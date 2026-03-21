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
	private kFactor: number = 25;
	private wkFactor: number = 25;
	private lkFactor: number = 25;
	private difference: number = 0;

	private outcome: number = 1;
	public winnerElo: number = 0;
	public loserElo: number = 0;

	/*
	kAlgWinner(winnerElo: any, loserElo: any){
		// Smurfing -> minimal gains or huge loss
		// Doing well despite low elo -> huge gains or minimal loss
		// Average -> average (and similar) gains and loss
		

		let temp: number = winnerElo.elo / loserElo.elo;
		console.log(temp);
		return 0;
	}

	kAlgLoser(winnerElo: any, loserElo: any){
		return 0;
	}
	*/

	probability(winnerElo: any, loserElo: any){
		return 1.0 / (1+ Math.pow(10, (winnerElo.elo - loserElo.elo) / 400.0));
	}

	updateElo(winnerElo: any, loserElo: any){
		let pb = this.probability(winnerElo, loserElo);
		let pa = this.probability(winnerElo, loserElo);

		/*
		this.wkFactor = this.kAlgWinner(winnerElo, loserElo);
		this.lkFactor = this.kAlgLoser(winnerElo, loserElo);
		*/

		this.winnerElo  = winnerElo.elo + this.kFactor * (this.outcome - pa);
		this.loserElo = loserElo.elo + this.kFactor * ((1 - this.outcome - pb));
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

		let winnerElo: number | unknown;
		let loserElo: number | unknown;
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
				winnerElo = userElo;
				loserElo = problemElo;
			} else if (attempt.correct == false){
				loserElo = userElo;
				winnerElo = problemElo;
			}

			const E = new Elo();
			E.updateElo(winnerElo, loserElo);

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
				userEloUpdate.run({userElo: E.winnerElo, user: user});
				problemEloUpdate.run({elo: E.loserElo, id: attempt.urlId});
				newUserElo = E.winnerElo;
				newProbElo = E.loserElo;

			} else if (attempt.correct == false){
				userEloUpdate.run({userElo: E.loserElo, user: user});
				problemEloUpdate.run({elo: E.winnerElo, id: attempt.urlId});
				newUserElo = E.loserElo;
				newProbElo = E.winnerElo;
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
