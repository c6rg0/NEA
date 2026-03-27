import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function createRouter(db: sqlite3.Database){
	const router = Router();

	interface problem_types {
		problem_id: number
	}

	router.get("/", (req: Request, res: Response) => {
		if (req.session.user){
			res.render("create", { login: true } );
			return;
		}

		res.render("create", { login: false } );
		return;
	});

	router.post("/", (req: Request, res: Response) => {
		const userInput = req.body;
		
		if (req.session.user) {
			if (!userInput){
				return res.status(204).send("Title is required");
			} else {
				
				const problemInsert = db.prepare(`
					INSERT INTO Problems (title, creator, instruction, example, answer) 
					VALUES(@title, @creator, @instruction, @example, @answer);
				`);

				problemInsert.run({
					title: userInput.title, creator: req.session.user, 
					instruction: userInput.instruction, example: userInput.example,
					answer: userInput.answer
				});
				
				const searchId = db.prepare(`
					SELECT problem_id 
					FROM Problems 
					WHERE title = ?
				`).get(userInput.title) as problem_types;
				console.log("problem_id: ", searchId.problem_id);

				return res.status(200).send();
			}
		} else {
			res.status(204).send("Please login first and retry after you're logged in!");
			return;

		}
	});

	return router;
}
