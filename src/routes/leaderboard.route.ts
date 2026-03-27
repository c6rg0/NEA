import { Request, Response, Router } from 'express'
import sqlite3 from "better-sqlite3";

export function leaderboardRouter(db: sqlite3.Database){
	const router = Router();

	router.get("/", async (req: Request, res: Response) => {

		const attempts = db.prepare(`
			SELECT * FROM Attempts 
			INNER JOIN Problems ON Attempts.problem_id = Problems.problem_id
			ORDER BY elo DESC
			LIMIT 50;
		`);

		const attemptsResult = attempts.all();

		res.render("leaderboard", { attempts: attemptsResult });

	});

	return router;
}
