import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function attemptRouter(db: sqlite3.Database){
	const ROUTER = Router();

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
		public outcome: number;

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
			let FETCH_USER = db.prepare(`
				SELECT elo FROM Users 
				WHERE username = ?
			`).get(user) as dbTypes;

			let fetchProblem = db.prepare(`
				SELECT elo FROM Problems 
				WHERE problem_id = ?`
			).get(attempt.urlId) as dbTypes;
			
			this.userElo = FETCH_USER.elo;
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

			if (!Number.isNaN(this.newUserElo) && !Number.isNaN(this.newProblemElo)){
				return;
			} else {
				return Error;
			}
		}
	}

	class Attempts{
		increment(attempt: payloadTypes){
			const UPDATE_ATTEMPTS = db.prepare(`
				UPDATE problems 
				SET times_attempted = times_attempted + 1 
				WHERE problem_id = (@id);
			`);

			UPDATE_ATTEMPTS.run({id: attempt.urlId});

			if (attempt.correct === true) {
				const UPDATE_SOLVED = db.prepare(`
					UPDATE Problems 
					SET times_solved = times_solved + 1 
					WHERE problem_id = (@id);
				`);

				UPDATE_SOLVED.run({id: attempt.urlId});
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
			
			const FETCH_USER = db.prepare(`
				SELECT solved FROM Attempts 
				WHERE username = (@user) AND 
				problem_id = (@id);
			`).get({ user: this.user, id: this.attempt.urlId }) as dbTypes;

			if (!FETCH_USER){
				this.attemptInsert(E);
				this.eloUpdate(E);
			}
			
			else if (FETCH_USER.solved === 0){
				this.attemptUpdate(E);
				this.eloUpdate(E);
			} 
			
			else if (FETCH_USER.solved === 1){ 
				// If a problem has been solved, then the user shouldn't
				// gain more elo from it, it would defeat the purpose since
				// people could farm easy problems.
			} 

			else {
				this.attemptInsert(E);
				this.eloUpdate(E);
			}
		}

		attemptInsert(E: Elo){
			const NEW_ATTEMPT = db.prepare(`
				INSERT INTO Attempts(username, problem_id, solved)
				VALUES(@username, @problem_id, @solved);
			`);

			NEW_ATTEMPT.run({username: this.user, problem_id: this.attempt.urlId, solved: E.outcome});
		}

		attemptUpdate(E: Elo){
			const TRIES_UPDATE = db.prepare(`
				UPDATE Attempts 
				SET tries = tries + 1 AND
				solved = (@solved)
				WHERE username = (@user) AND 
				problem_id = (@id);
			`);

			TRIES_UPDATE.run({solved: E.outcome, user: this.user, id: this.attempt.urlId});
		}

		eloUpdate(E: Elo){
			const USER_ELO_UPDATE = db.prepare(`
				UPDATE Users 
				SET elo = (@userElo) 
				WHERE username = (@user);
			`);
			
			USER_ELO_UPDATE.run({userElo: E.newUserElo, user: this.user});

			const PROBLEM_ELO_UPDATE = db.prepare(`
				UPDATE Problems 
				SET elo = (@elo) 
				WHERE problem_id = (@id);
			`);

			PROBLEM_ELO_UPDATE.run({elo: E.newProblemElo, id: this.attempt.urlId});
		}

	}

	ROUTER.post("/", async (req: Request, res: Response) => {
		try {
			let user = req.session.user as unknown as userTypes;
			let attempt: payloadTypes = req.body;

			let A = new Attempts(user, attempt);
			A.increment(attempt);

			if (user){
				// 1 = user winner, 0 = user loser
				let outcome: number;

				if (attempt.correct === true){ outcome = 1; }
				else { outcome = 0; }

				const E = new Elo(25, outcome);

				E.fetchElo(user, attempt);
				E.update();

				A.record(E);
			}

			return res.status(200).send("Success.");

		} catch (Error) {
			console.log(Error);
			return res.status(500).send("HTTP CODE 500");
		}
	});

	return ROUTER;
}

