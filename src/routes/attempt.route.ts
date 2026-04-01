import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function attemptRouter(db: sqlite3.Database){
	const router = Router();

	interface userTypes {
		username: string,
	}

	interface payloadTypes {
		correct: boolean,
		urlId: string,
	}

	interface dbTypes {
		elo: number,
		tries: number,
		solved: number,
	}

	class Elo {
		private kFactor: number;
		private outcome: number;

		private pa: number = 0;
		private pb: number = 0;

		private userElo: number = 0;
		private problemElo: number = 0;
 
		public newUserElo: number = 0;
		public newProblemElo: number = 0;

		// constructor
		constructor(kFactor: number, outcome: number) {
		    this.kFactor = kFactor;
		    this.outcome = outcome;
		}

		fetchElo(user: userTypes, attempt: payloadTypes){
			let fetchUser = db.prepare(`
				SELECT elo FROM Users 
				WHERE username = ?
			`).get(user) as dbTypes;

			let fetchProblem = db.prepare(`
				SELECT elo FROM Problems 
				WHERE problem_id = ?`
			).get(attempt.urlId) as dbTypes;
			
			this.userElo = fetchUser.elo;
			this.problemElo = fetchProblem.elo;
		}

		// getter 
		probability(rating1: number, rating2: number){
			return 1 / (1 + Math.pow(10, (rating1 - rating2) / 400));
		}

		// setter 
		update(){
			this.pa = this.probability(this.problemElo, this.userElo);
			this.pb = this.probability(this.userElo, this.problemElo);

			this.newUserElo  = this.userElo + this.kFactor * (this.outcome - this.pa);
			this.newProblemElo = this.problemElo + this.kFactor * ((1 - this.outcome - this.pb));

			// float -> int 
			this.newUserElo = Math.trunc(this.newUserElo);
			this.newProblemElo = Math.trunc(this.newProblemElo);
		}
	}

	class Attempts{
		increment(attempt: payloadTypes){
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

		private user: userTypes;
		private attempt: payloadTypes;

		constructor(user: userTypes, attempt: payloadTypes){
			this.user = user;
			this.attempt = attempt;
		}

		record(E: Elo){
			// Redirects user based on whether they already have
			// history on a problem, then calls method to update
			// elo.
			
			const fetchUser = db.prepare(`
				SELECT solved FROM Attempts 
				WHERE username = (@user) AND 
				problem_id = (@id);
			`).get({user: this.user, id: this.attempt.urlId}) as dbTypes;

			if (fetchUser.solved == 0){
				this.attemptUpdate();
			} 
			
			else if (fetchUser.solved == 1){
				this.attemptUpdate();
			} 

			else {
				this.attemptInsert();
			}

			// Only updating elo once attempt has been inserted/updated
			this.eloUpdate(E);
		}

		attemptInsert(){
			const newAttempt  = db.prepare(`
				INSERT INTO Attempts(username, problem_id)
				VALUES(@username, @problem_id);
			`);

			newAttempt.run({username: this.user, problem_id: this.attempt.urlId});
		}

		attemptUpdate(){
			const triesUpdate = db.prepare(`
				UPDATE Attempts 
				SET tries = tries + 1
				WHERE username = (@user) AND 
				problem_id = (@id);
			`);

			triesUpdate.run({user: this.user, id: this.attempt.urlId});

		}

		eloUpdate(E: Elo){
			const userEloUpdate = db.prepare(`
				UPDATE Users 
				SET elo = (@userElo) 
				WHERE username = (@user);
			`);

			userEloUpdate.run({userElo: E.newUserElo, user: this.user});

			const problemEloUpdate = db.prepare(`
				UPDATE Problems 
				SET elo = (@elo) 
				WHERE problem_id = (@id);
			`);

			problemEloUpdate.run({elo: E.newProblemElo, id: this.attempt.urlId});
		}

	}

	router.post("/", async (req: Request, res: Response) => {
		try {
			let user = req.session.user as userTypes;
			let attempt: payloadTypes = req.body;

			let A = new Attempts(user, attempt);
			A.increment(attempt);

			if (user){
				// 1 = user winner, 0 = user loser
				let outcome: number;

				if (attempt.correct == true){ outcome = 1; }
				else { outcome = 0; }

				const E = new Elo(25, outcome);

				E.fetchElo(user, attempt);
				E.update();

				A.record(E);

			}

			return res.status(200).send("Success.");

		} catch (error) {
			console.log(error);
			return res.status(500).send("HTTP CODE 500 D:");
		}
	});

	return router;
}

