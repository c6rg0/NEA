//search-request.ts
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

router.post("/", async (req, res) => {
	const user_search = req.body;
	console.log("Search:", user_search);

	const select_search = regex_problems.prepare(`SELECT title FROM Problems;`).get(user_search.name);

	if (select_search) {
		console.log("Results shown");
		console.log();
	} else{
		console.log("501: Not implemented");
		console.log();
	}

	res.redirect('/browse');
	/*
	Info about dynamic routing:
	https://stackoverflow.com/questions/25623041/how-to-configure-dynamic-routes-with-express-js*/

});

export default router;
