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

router.get('/:id', (req, res) => {
	let user = req.params.id;
	
	// SQL table not updated for this yet
	// I need to create a results table that connects users and problems via completions
	const userSearch = regex_problems.prepare(`SELECT username, elo FROM Users WHERE username = ?`).get(user);

	// views/user.ejs doesn't exist yet
	res.render("user", { results: userSearch } );

});

export default router;
