import { Request, Response, Router } from 'express'
import Database from "better-sqlite3";

export function leaderboardRouter(regex_problems:
				 Database.Database){
	const router = Router();

	router.get("/", async (req: Request, res: Response) => {

		const attempts = regex_problems.prepare(`
			SELECT * FROM Attempts 
			INNER JOIN Problems ON Attempts.problem_id = Problems.problem_id
			ORDER BY elo DESC
			LIMIT 50;
		`);

		const attempts_result = attempts.all();

		res.render("leaderboard", { attempts: attempts_result });

	});

	return router;
}
