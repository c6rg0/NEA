import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function redirectRouter(db: sqlite3.Database){
	const ROUTER = Router();

	interface redirectTypes{
		title: string
		problem_id: number
	}

	ROUTER.get("/:id", (req: Request, res: Response) => {
		const ID = req.params.id; 
		res.render("create_success", { id: ID });
	});

	ROUTER.search("/", (req: Request, res: Response) => {
		const ID = req.body as redirectTypes;

		const USER_SEARCH = db.prepare(`
			SELECT problem_id 
			FROM Problems WHERE title = ?
		`).get(ID.title) as redirectTypes;

		if (USER_SEARCH){
			const URL = "/redirect/" + USER_SEARCH.problem_id;
			return res.redirect(303, URL);
		} else {
			return res.status(404).json({ error: "Couldn't find problem_id using title" });
		}
	});


	ROUTER.all("/", (req: Request, res: Response) => {
		res.set("Allow", "SEARCH");
		res.status(405).json({ error: "HTTP method not allowed" });
	});

	ROUTER.all("/:id", (req: Request, res: Response) => {
		res.set("Allow", "GET");
		res.status(501).json({ error: "Using a URL path ID isn't supported" });
	});

	return ROUTER;
}
