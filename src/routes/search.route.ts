import { Request, Response, Router } from 'express'
import sqlite3 from "better-sqlite3";

export function searchRouter(db: sqlite3.Database){
	const router = Router();

	router.get("/:id", async (req: Request, res: Response) => {
		const id = req.params.id;
		console.log("Search:", id);

		const search = db.prepare(`
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

	return router;
}
