import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function redirectRouter(db: sqlite3.Database){
	const router = Router();

	interface redirectTypes{
		title: string
		problem_id: number
	}

	router.search("/", (req: Request, res: Response) => {
		const id  = req.body as redirectTypes;
		console.log(id);

		const userSearch = db.prepare(`
			SELECT problem_id 
			FROM Problems WHERE title = ?
		`).get(id.title) as redirectTypes;

		console.log(userSearch);

		if (userSearch){
			const url = "/redirect/" + userSearch.problem_id;
			return res.redirect(303, url);
		} else {
			return res.status(404).send("Couldn't find problem_id using title");
		}
	});

	router.get("/:id", (req: Request, res: Response) => {
		const id = req.params.id; 

		res.render("create_success", {id: id});
	});

	return router;
}
