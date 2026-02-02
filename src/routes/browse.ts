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
	
	
	// const search_result = ["JavaScript quiz", "Rust quiz", "Cybersec quiz", "C++ quiz (not this one please)"];
	
	// After a proper sql query is complete, you'll have
	// to use .rows on search_result below:
	// https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/rows

	res.render("browse", { results: search_result } );
});

export default router;

// [<a href="/quiz/<%= item.id %>">] for redirecting
// to the quiz routes
 
