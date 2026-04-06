import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function solutionRouter(db: sqlite3.Database){
	const ROUTER = Router();

	interface types {
		example: string,
		answer: string,
	}

	ROUTER.get("/:id", async(req: Request, res: Response) => {
		const ID  = req.params.id;

		try {
			const response  = db.prepare(`SELECT answer, example FROM Problems WHERE problem_id = ?;`).get(ID);
			console.log("answer = " + (response as types).answer);

			return res.json(response);

		} catch(error){
			return res.status(500).send(error + ": unkown error");
		}
		
	});

	return ROUTER;
}
