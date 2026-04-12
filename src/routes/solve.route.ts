import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function solveRouter(DB: sqlite3.Database){
	const ROUTER = Router();

	interface fetch {
		id: string;
		creator: string,
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

		if (info){
			if (req.session.user === info.creator){
				res.render("solve", {
					info: info, 
					attempts: attemptsResult,
					auth: true,
				});
			} else {
				res.render("solve", {
					info: info, 
					attempts: attemptsResult,
					auth: false,
				});
			}
		}
	});

	ROUTER.all("/:id", (req: Request, res: Response) => {
		res.set("Allow", "GET");
		res.status(405).json({ error: "HTTP method not allowed" });

	});

	return ROUTER;
}
