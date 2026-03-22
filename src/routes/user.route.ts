import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function userRouter(db: sqlite3.Database){
	const router = Router();

	router.get("/:id", (req: Request, res: Response) => {
		let user = req.params.id;
		
		const userSearch = db.prepare(`
			SELECT username, elo 
			FROM Users WHERE username = ?
		`).get(user);

		const attempts  = db.prepare(`
			SELECT * FROM Attempts 
			INNER JOIN Problems ON Attempts.problem_id = Problems.problem_id 
			WHERE Attempts.username = ? 
		`);

		const attempts_result = attempts.all(user);

		res.render("user", { results: userSearch, attempts: attempts_result });
	});

	return router;
}
