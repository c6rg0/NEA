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
	
	const search  = regex_problems.prepare(`SELECT problem_id, title FROM Problems LIMIT 10;`);
	const search_result = search.all();
	console.log(search_result);
	
	res.render("browse", { results: search_result } );
});

export default router;

// [<a href="/quiz/<%= item.id %>">] for redirecting
// to the quiz routes
 
