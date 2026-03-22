import { Request, Response, Router } from "express";
import Database from "better-sqlite3";

export function solveRouter(regex_problems: Database.Database){
	const router = Router();

	interface fetch {
		id: string;
	}

	router.get("/:id", async(req: Request, res: Response) => {
		const id  = req.params.id;

		try{
			const info = regex_problems.prepare(`
				SELECT * FROM Problems 
				WHERE problem_id = ?;
			`).get(id) as fetch | undefined;

			const attempts = regex_problems.prepare(`
				SELECT Attempts.*, Users.elo
				FROM Attempts
				INNER JOIN Problems ON Attempts.problem_id = Problems.problem_id
				INNER JOIN Users ON Attempts.username = Users.username
				WHERE Attempts.problem_id = ? 
				LIMIT 10;
			`);

			const attempts_result = attempts.all(id);

			res.render("solve", {info: info, attempts: attempts_result});

		} catch(error){
			return res.status(500).send(error + ": unkown error");
		}
		
	});

	return router;
}
