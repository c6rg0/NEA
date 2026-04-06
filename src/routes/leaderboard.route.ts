import { Request, Response, Router } from 'express'
import sqlite3 from "better-sqlite3";

export function leaderboardRouter(db: sqlite3.Database){
	const ROUTER = Router();

	ROUTER.get("/", async (req: Request, res: Response) => {

		const ATTEMPTS = db.prepare(`
			SELECT * FROM Attempts 
			INNER JOIN Problems ON Attempts.problem_id = Problems.problem_id
			ORDER BY elo DESC
			LIMIT 50;
		`);

		const ATTEMPTS_RESULT = ATTEMPTS.all();

		res.render("leaderboard", { attempts: ATTEMPTS_RESULT });

	});

	return ROUTER;
}
