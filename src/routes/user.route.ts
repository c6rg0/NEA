import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function userRouter(DB: sqlite3.Database){
	const ROUTER = Router();

	ROUTER.get("/:id", (req: Request, res: Response) => {
		const USER = req.params.id;
		
		const USER_SEARCH = DB.prepare(`
			SELECT USERname, elo, time_created
			FROM Users WHERE USERname = ?
		`).get(USER);
		console.log(USER_SEARCH);

		const ATTEMPTS = DB.prepare(`
			SELECT * FROM Attempts 
			INNER JOIN Problems ON Attempts.problem_id = Problems.problem_id 
			WHERE Attempts.USERname = ? 
			ORDER BY Problems.elo DESC
		`);

		const AVERAGE_ELO_ATTEMPTED = DB.prepare(`
			SELECT AVG(Problems.elo) 
			AS avg_elo
			FROM Attempts 
			INNER JOIN Problems ON Attempts.problem_id = Problems.problem_id 
			WHERE Attempts.USERname = ? 
		`).get(USER);

		const ATTEMPTS_RESULT = ATTEMPTS.all(USER);

		res.render("user", { results: USER_SEARCH, attempts: ATTEMPTS_RESULT, average: AVERAGE_ELO_ATTEMPTED});
	});

	return ROUTER;
}
