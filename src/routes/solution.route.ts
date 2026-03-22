import { Request, Response, Router } from "express";
import Database from "better-sqlite3";

export function solutionRouter(regex_problems: Database.Database){
	const router = Router();

	interface types {
		example: string,
		answer: string,
	}

	router.get("/:id", async(req: Request, res: Response) => {
		const id  = req.params.id;

		try {
			const response  = regex_problems.prepare(`SELECT answer, example FROM Problems WHERE problem_id = ?;`).get(id);
			console.log("answer = " + (response as types).answer);

			return res.json(response);

		} catch(error){
			return res.status(500).send(error + ": unkown error");
		}
		
	});

	return router;
}
