import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function attemptRouter(db: sqlite3.Database){
	const router = Router();

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
			const updateAttempts = db.prepare(`
				UPDATE problems 
				SET times_attempted = times_attempted + 1 
				WHERE problem_id = (@id);
			`);

			updateAttempts.run({id: attempt.urlId});

			if (attempt.correct == true) {
				const updateSolved = db.prepare(`
					UPDATE Problems 
					SET times_solved = times_solved + 1 
					WHERE problem_id = (@id);
				`);

				updateSolved.run({id: attempt.urlId});
			}
		}
		
		record(user: any, attempt: any){
			const newAttempt  = db.prepare(`
				INSERT INTO Attempts(username, problem_id, tries)
				VALUES(@username, @problem_id, @tries);
			`);

			newAttempt.run({username: user, problem_id: attempt.urlId, tries: 1});
		}
	}

	router.post("/", async (req: Request, res: Response) => {
		try {
			let user = req.session.user;
			let attempt = req.body;

			let A = new Attempts();
			A.increment(attempt);

			let winnerElo: number | unknown;
			let loserElo: number | unknown;
			let newUserElo: number | unknown;
			let newProbElo: number | unknown;

			if (user){
				let userElo = db.prepare(`
					SELECT elo FROM Users 
					WHERE username = ?
				`).get(user) as types;

				let problemElo  = db.prepare(`
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

				const userEloUpdate = db.prepare(`
					UPDATE Users 
					SET elo = (@userElo) 
					WHERE username = (@user);
				`);

				const problemEloUpdate = db.prepare(`
					UPDATE Problems 
					SET elo = (@elo) 
					WHERE problem_id = (@id);
				`);

				if (attempt.correct == true){
					userEloUpdate.run({userElo: E.winnerElo, user: user});
					problemEloUpdate.run({elo: E.loserElo, id: attempt.urlId});
					newUserElo = E.winnerElo;
					newProbElo = E.loserElo;
					A.record(user, attempt);

				} else if (attempt.correct == false){
					userEloUpdate.run({userElo: E.loserElo, user: user});
					problemEloUpdate.run({elo: E.winnerElo, id: attempt.urlId});
					newUserElo = E.loserElo;
					newProbElo = E.winnerElo;
				}
			}

			return res.status(200).send("Success.");

		} catch (error) {
			console.log(error);
			return res.status(500).send("HTTP CODE 500 D:");
		}
	});

	return router;
}

