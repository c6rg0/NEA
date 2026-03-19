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

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	console.log("Search:", id);

	const search = regex_problems.prepare(`
		SELECT Problems.* 
		FROM Problems
		INNER JOIN Problems_fts ON Problems.problem_id = Problems_fts.rowid
		WHERE Problems_fts MATCH ?
		ORDER BY rank;
	`);

	const search_result = search.all(id);

	if (search_result) {
		console.log("Results shown");
		res.render("search", { results: search_result, userSearch: id });
	} else{
		res.status(404).send("Data not found");
	}

});

export default router;
