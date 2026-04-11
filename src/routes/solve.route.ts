import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function solveRouter(DB: sqlite3.Database){
	const ROUTER = Router();

	interface fetch {
		id: string;
	}

	ROUTER.get("/:id", async(req: Request, res: Response) => {
		const ID  = req.params.id;

		const info = DB.prepare(`
			SELECT * FROM Problems 
			WHERE problem_id = ?;
		`).get(ID) as fetch | undefined;

		const attempts = DB.prepare(`
			SELECT Attempts.*, Users.elo
			FROM Attempts
			INNER JOIN Problems ON Attempts.problem_id = Problems.problem_id
			INNER JOIN Users ON Attempts.username = Users.username
			WHERE Attempts.problem_id = ? 
			LIMIT 10;
		`);

		const attemptsResult = attempts.all(ID);

		if (info && req.session.user){
			res.render("solve", {
				info: info, 
				attempts: attemptsResult,
				auth: true,
			});

		} else if (info) {
			res.render("solve", {
				info: info, 
				attempts: attemptsResult,
				auth: false,
			});
		}
	});

	ROUTER.get("/", async(req: Request, res: Response) => {
		res.status(404).send("404: No problem_id supplied");
	});

	return ROUTER;
}
