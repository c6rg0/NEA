//problem.ts
import express from "express";

const router = express.Router();

import Database from "better-sqlite3";
const regex_problems = Database("./database/regex_problems.db", { verbose: console.log });

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

interface fetch {
	id: string;
}

router.get("/:id", async(req, res) => {
	console.log(req.params.id);

	/*
	const problem_fetch  = regex_problems.prepare(`SELECT title, creator, instruction, example, answer, answer, test, diff FROM Problems;`).get(id) as fetch | undefined;
	*/

	res.render("problem");
});

export default router;

