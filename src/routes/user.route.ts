import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function userRouter(db: sqlite3.Database){
	const router = Router();

	router.get("/:id", (req: Request, res: Response) => {
		let user = req.params.id;
		
		const userSearch = db.prepare(`
			SELECT username, elo, time_created
			FROM Users WHERE username = ?
		`).get(user);
		console.log(userSearch);

		const attempts = db.prepare(`
			SELECT * FROM Attempts 
			INNER JOIN Problems ON Attempts.problem_id = Problems.problem_id 
			WHERE Attempts.username = ? 
			ORDER BY Problems.elo DESC
		`);

		const averageEloAttempted = db.prepare(`
			SELECT AVG(Problems.elo) 
			AS avg_elo
			FROM Attempts 
			INNER JOIN Problems ON Attempts.problem_id = Problems.problem_id 
			WHERE Attempts.username = ? 
		`).get(user);

		const attempts_result = attempts.all(user);

		res.render("user", { results: userSearch, attempts: attempts_result, average: averageEloAttempted});
	});

	return router;
}
