import express from "express";
const router = express.Router();

import Database from "better-sqlite3";
const regex_problems = Database("./database/regex_problems.db", { verbose: console.log });

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

interface problem_types {
	problem_id: number
}

router.get("/", (req, res) => {
	res.render("create");
});

router.post("/", (req, res) => {
	const user_input = req.body;
	
	if (req.session.user) {
		if (!user_input){
			return res.status(204).send("Title is required");
		} else {
			
			const insert_problem = regex_problems.prepare(`
				INSERT INTO Problems (title, creator, instruction, example, answer) 
				VALUES(@title, @creator, @instruction, @example, @answer);
			`);

			insert_problem.run({
				title: user_input.title, creator: req.session.user, 
				instruction: user_input.instruction, example: user_input.example,
				answer: user_input.answer
			});
			
			const id_search = regex_problems.prepare(`
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

export default router;
