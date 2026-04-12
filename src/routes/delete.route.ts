import { Request, Response, Router } from 'express'
import sqlite3 from "better-sqlite3";

export function deleteRouter(DB: sqlite3.Database){
	const ROUTER = Router();

	interface problemType {
		creator: string
	}

	ROUTER.get("/:id", (req: Request, res: Response) => {
		const ID = req.params.id;
		const USER = req.session.user;

		const PROBLEM = DB.prepare(`
			SELECT *
			FROM Problems
			WHERE problem_id = (@id);
		`).get({ id: ID }) as problemType;

		if (PROBLEM){
			if (USER === PROBLEM.creator){
				res.render("delete", { authorized: true, problem: PROBLEM });
			} else {
				res.render("delete", { authorized: false, problem: {} });
			}
		} else {
			res.render("delete", { authorized: false, problem: {} });
		}
	});

	ROUTER.delete("/:id", async (req: Request, res: Response) => {
		const ID = req.params.id;
		const USER = req.session.user;

		const PROBLEM = DB.prepare(`
			SELECT creator
			FROM Problems
			WHERE problem_id = (@id);
		`).get({ id: ID }) as problemType;

		if (PROBLEM){
			if (USER === PROBLEM.creator){
				DB.prepare(`
					DELETE FROM PROBLEMS
					WHERE problem_id = (@id);
				`).run({ id: ID });
				
				return res.status(200).send();

			} else {
				return res.status(403).json({ error: "Not authorized for the requested action" });
			}
		}
	});

	ROUTER.all("/id", (req: Request, res: Response) => {
		res.set("Allow", "GET, DELETE");
		res.status(405).json({ error: "HTTP method not allowed" });
	});

	return ROUTER;
}
