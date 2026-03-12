//browse.ts
import express from "express";
// import path from "path";

const router = express.Router();

import Database from "better-sqlite3";
const regex_problems = Database("./database/regex_problems.db", { verbose: console.log });

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

router.get("/", async (req, res) => {
	
	const search  = regex_problems.prepare(`SELECT problem_id, title, elo, times_attempted FROM Problems LIMIT 10;`);
	const search_result = search.all();
	
	res.render("browse", { results: search_result } );
});

export default router;
