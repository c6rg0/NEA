import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function createRouter(db: sqlite3.Database){
	const router = Router();

	interface problem_types {
		problem_id: number
	}

	router.get("/", (req: Request, res: Response) => {
		res.render("create");
		return;
	});

	router.post("/", (req: Request, res: Response) => {
		const user_input = req.body;
		
		if (req.session.user) {
			if (!user_input){
				return res.status(204).send("Title is required");
			} else {
				
				const insert_problem = db.prepare(`
					INSERT INTO Problems (title, creator, instruction, example, answer) 
					VALUES(@title, @creator, @instruction, @example, @answer);
				`);

				insert_problem.run({
					title: user_input.title, creator: req.session.user, 
					instruction: user_input.instruction, example: user_input.example,
					answer: user_input.answer
				});
				
				const id_search = db.prepare(`
					SELECT problem_id 
					FROM Problems 
					WHERE title = ?
				`).get(user_input.title) as problem_types;
				console.log("problem_id: ", id_search.problem_id);

				return res.status(200).send();
			}
		} else {
			res.status(204).send("Please login first and retry after you're logged in!");
			return;

		}
	});

	return router;
}
