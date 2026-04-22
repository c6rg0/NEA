import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function solutionRouter(DB: sqlite3.Database){
	const ROUTER = Router();

	interface types {
		test_data: string,
		answer: string,
	}

	ROUTER.get("/:id", async(req: Request, res: Response) => {
		const ID  = req.params.id;

		try {
			const response = DB.prepare(`SELECT answer, test_data FROM Problems WHERE problem_id = ?;`).get(ID);

			// Usefull for testing purposes
			console.log("answer = " + (response as types).answer);

			return res.json(response);

		} catch(error){
			return res.status(500).json({ error: "Unknown server error" });
		}
		
	});

	ROUTER.all("/:id", (req: Request, res: Response) => {
		res.set("Allow", "GET");
		res.status(405).json({ error: "HTTP method not allowed" });
	});


	return ROUTER;
}
