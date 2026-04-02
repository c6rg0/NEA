import { Request, Response, Router } from 'express'
import sqlite3 from "better-sqlite3";

export function searchRouter(db: sqlite3.Database){
	const router = Router();

	router.get("/", async (req: Request, res: Response) => {
		// Once sorting comes into play, more can be appended to this single constant
		// const { query } = req.query;
		const query = req.query.q;
		console.log("Search query: " + query);

		const search = db.prepare(`
			SELECT Problems.* 
			FROM Problems
			INNER JOIN Problems_fts ON Problems.problem_id = Problems_fts.rowid
			WHERE Problems_fts MATCH ?
			ORDER BY rank;
		`);

		const results = search.all(query);

		if (results) {
			res.render("search", { activity: "Searching...", results: results, userSearch: query });
		} else{
			res.status(404).send("Data not found");
		}

	});

	return router;
}
