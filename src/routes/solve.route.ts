import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function solveRouter(db: sqlite3.Database){
	const ROUTER = Router();

	interface fetch {
		id: string;
	}

	ROUTER.get("/:id", async(req: Request, res: Response) => {
		const ID  = req.params.id;

		try{
			const info = db.prepare(`
				SELECT * FROM Problems 
				WHERE problem_id = ?;
			`).get(ID) as fetch | undefined;

			const attempts = db.prepare(`
				SELECT Attempts.*, Users.elo
				FROM Attempts
				INNER JOIN Problems ON Attempts.problem_id = Problems.problem_id
				INNER JOIN Users ON Attempts.username = Users.username
				WHERE Attempts.problem_id = ? 
				LIMIT 10;
			`);

			const attemptsResult = attempts.all(ID);

			res.render("solve", {info: info, attempts: attemptsResult});

		} catch(error){
			return res.status(500).send(error + ": unkown error");
		}
		
	});

	return ROUTER;
}
