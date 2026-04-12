import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function createRouter(DB: sqlite3.Database){
	const ROUTER = Router();

	interface problem_types {
		problem_id: number
	}

	ROUTER.get("/", (req: Request, res: Response) => {
		if (req.session.user){
			res.render("create", { login: true } );
			return;
		}

		res.render("create", { login: false } );
		return;
	});

	ROUTER.post("/", (req: Request, res: Response) => {
		const USER_INPUT = req.body;
		
		if (req.session.user) {
			if (!USER_INPUT){
				return res.status(204).json({ error: "Title is required" });
			} else {
				
				const PROBLEM_INSERT = DB.prepare(`
					INSERT INTO Problems 
					(title, creator, instruction, example, answer) 
					VALUES
					(@title, @creator, @instruction, @example, @answer);
				`);

				PROBLEM_INSERT.run({
					title: USER_INPUT.title, 
					creator: req.session.user, 
					instruction: USER_INPUT.instruction, 
					example: USER_INPUT.example,
					answer: USER_INPUT.answer
				});
				
				const SEARCH_ID = DB.prepare(`
					SELECT problem_id 
					FROM Problems 
					WHERE title = ?
				`).get(USER_INPUT.title) as problem_types;

				return res.status(200).send();
			}
		} else {
			res.status(204).json({ error: "Please login first" });
			return;

		}
	});

	ROUTER.all("/", (req: Request, res: Response) => {
		res.set("Allow", "GET, POST");
		res.status(405).json({ error: "HTTP nethod not allowed" });
	});

	return ROUTER;
}
