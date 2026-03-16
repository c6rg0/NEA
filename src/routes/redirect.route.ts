import express from "express";
const router = express.Router();

import Database from "better-sqlite3";
const regex_problems = Database("./database/regex_problems.db", { verbose: console.log });

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

interface redirectTypes{
	title: string
	problem_id: number
}

router.search("/", (req, res) => {
	const id  = req.body as redirectTypes;
	console.log(id);

	const userSearch = regex_problems.prepare(`
		SELECT problem_id 
		FROM Problems WHERE title = ?
	`).get(id.title) as redirectTypes;

	console.log(userSearch);

	if (userSearch){
		return res.send(userSearch);
	} else {
		return res.status(404).send("Couldn't find problem_id using title");
	}
});

router.get("/:id", (req, res) => {
	const id = req.params.id; 

	res.render("create_success", {id: id});
});

export default router;
