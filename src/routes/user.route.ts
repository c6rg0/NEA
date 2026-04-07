import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function userRouter(DB: sqlite3.Database){
	const ROUTER = Router();

	ROUTER.get("/:id", (req: Request, res: Response) => {
		const USER = req.params.id;
		
		const USER_SEARCH = DB.prepare(`
			SELECT username, elo, time_created
			FROM Users WHERE username = ?
		`).get(USER);
		console.log(USER_SEARCH);

		const ATTEMPTS = DB.prepare(`
			SELECT * FROM Attempts 
			INNER JOIN Problems ON Attempts.problem_id = Problems.problem_id 
			WHERE Attempts.username = ? 
			ORDER BY Problems.elo DESC
		`).all(USER);

		const AVERAGE_ELO_ATTEMPTED = DB.prepare(`
			SELECT AVG(Problems.elo) 
			AS avg_elo
			FROM Attempts 
			INNER JOIN Problems ON Attempts.problem_id = Problems.problem_id 
			WHERE Attempts.username = ? 
		`).get(USER);

		const USER_PROBLEMS = DB.prepare(`
			SELECT * FROM Problems 
			WHERE creator = ? 
			ORDER BY time_created DESC
		`).all(USER);

		res.render("user", { results: USER_SEARCH, average: AVERAGE_ELO_ATTEMPTED, attempts: ATTEMPTS, problems: USER_PROBLEMS });
	});

	return ROUTER;
}
