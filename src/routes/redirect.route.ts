import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function redirectRouter(db: sqlite3.Database){
	const ROUTER = Router();

	interface redirectTypes{
		title: string
		problem_id: number
	}

	ROUTER.search("/", (req: Request, res: Response) => {
		const ID = req.body as redirectTypes;
		console.log(ID);

		const USER_SEARCH = db.prepare(`
			SELECT problem_id 
			FROM Problems WHERE title = ?
		`).get(ID.title) as redirectTypes;

		console.log(USER_SEARCH);

		if (USER_SEARCH){
			const URL = "/redirect/" + USER_SEARCH.problem_id;
			return res.redirect(303, URL);
		} else {
			return res.status(404).send("Couldn't find problem_id using title");
		}
	});

	ROUTER.get("/:id", (req: Request, res: Response) => {
		const ID = req.params.id; 

		res.render("create_success", { id: ID });
	});

	return ROUTER;
}
