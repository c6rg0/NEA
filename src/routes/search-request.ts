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

router.post("/:id", async (req, res) => {
	const query = req.params.id;
	console.log("Search:", query);

	const select_search = regex_problems.prepare(`MATCH title FROM Problems WHERE title = ?;`).get(query);

	if (select_search) {
		console.log("Results shown");
		return res.render("search", { results: select_search });
	} else{
		return res.status(404).send("Data not found");
	}

});

export default router;
