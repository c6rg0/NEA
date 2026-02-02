//browse.ts
import express from "express";
import path from "path";

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

router.get("/:id", async (req, res) => {
	let id = req.params.id;
	const quiz_fetch  = regex_problems.prepare(`SELECT * FROM Problems;`).get(id) as fetch | undefined;
	res.render('quiz', { results: quiz_fetch } );

});

export default router;

