//user.ts
import express from "express";
const router = express.Router();

import Database from 'better-sqlite3';
const regex_problems = Database('./database/regex_problems.db', { verbose: console.log });

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

router.post('/:id', (req, res) => {
	let user = req.params.id;
	
	// SQL table not updated for this yet
	const user_search  = regex_problems.prepare(`SELECT problem_id, title FROM Problems LIMIT 10;`);
	const search_result = user_search.all();

	// views/user.ejs doesn't exist yet
	res.render("user", { results: search_result } );

});

export default router;
