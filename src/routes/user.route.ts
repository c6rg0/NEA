import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function userRouter(DB: sqlite3.Database){
	const ROUTER = Router();

	class Get {
		public TARGET; 

		constructor(ID: string | undefined, USER: string | undefined){
			if (ID){
				this.TARGET = ID;
			} else if (USER){
				this.TARGET = USER;
			}
		}

		userInfo(){
			return DB.prepare(`
				SELECT username, elo, time_created
				FROM Users WHERE username = ?
			`).get(this.TARGET);
		}

		attempts(){
			return DB.prepare(`
				SELECT * FROM Attempts 
				INNER JOIN Problems ON Attempts.problem_id = Problems.problem_id 
				WHERE Attempts.username = ? 
				ORDER BY Problems.elo DESC
			`).all(this.TARGET);
		}

		averageEloSolved(){
			return DB.prepare(`
				SELECT AVG(Problems.elo) 
				AS avg_elo
				FROM Attempts 
				INNER JOIN Problems ON Attempts.problem_id = Problems.problem_id 
				WHERE Attempts.username = ? 
			`).get(this.TARGET);
		}

		problems(){
			return DB.prepare(`
				SELECT * FROM Problems 
				WHERE creator = ? 
				ORDER BY time_created DESC
			`).all(this.TARGET);
		}
	}

	ROUTER.get("/:id", (req: Request, res: Response) => {
		const ID = req.params.id;
		const USER = req.session.user;

		const G = new Get(ID, USER);
		const userInfo = G.userInfo();

		if (G.TARGET && userInfo){
			const averageEloSolved = G.averageEloSolved();
			const attempts = G.attempts();
			const problems = G.problems();

			if (req.session.user === G.TARGET){
				return res.render("user", { 
					results: userInfo, 
					average: averageEloSolved, 
					attempts: attempts, 
					problems: problems,
					auth: true,
				});
			}

			return res.render("user", { 
					results: userInfo, 
					average: averageEloSolved, 
					attempts: attempts, 
					problems: problems,
					auth: false,
			});
		}

		return res.render("user", { 
			results: null, 
			average: null, 
			attempts: null, 
			problems: null,
			auth: false,
		});
	});

	ROUTER.get("/", (req: Request, res: Response) => {
		const ID = undefined;
		const USER = req.session.user;
		const G = new Get(ID, USER);

		const userInfo = G.userInfo();

		if (G.TARGET && userInfo){
			const averageEloSolved = G.averageEloSolved();
			const attempts = G.attempts();
			const problems = G.problems();

			return res.render("user", { 
				results: userInfo, 
				average: averageEloSolved, 
				attempts: attempts, 
				problems: problems,
				auth: true,
			});
		}

		return res.render("user", { 
			results: null, 
			average: null, 
			attempts: null, 
			problems: null,
			auth: false,
		});
	});

	ROUTER.all("/", (req: Request, res: Response) => {
		res.set("Allow", "GET");
		res.status(405).json({ error: "HTTP method not allowed" });
	});

	ROUTER.all("/:id", (req: Request, res: Response) => {
		res.set("Allow", "GET");
		res.status(405).json({ error: "HTTP method not allowed" });
	});

	return ROUTER;
}
