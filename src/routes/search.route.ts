import { Request, Response, Router } from 'express'
import sqlite3 from "better-sqlite3";

export function searchRouter(db: sqlite3.Database){
	const router = Router();

	router.get("/", async (req: Request, res: Response) => {
		let unsanitizedQuery = req.query.q;
		const pageString = req.query.o;

		// Queries should get sanitised first
		
		let query: string = "";
		if (unsanitizedQuery){
			unsanitizedQuery = unsanitizedQuery.toString();
			const reForAlphNum: RegExp = /[^a-zA-Z0-9 ]/g;
			query = unsanitizedQuery.replace(reForAlphNum, "").trim();
		}

		let page: number = 1;
		if (pageString){
			page = Number(pageString);
		}

		const limit = 50;
		const offset = (page - 1) * limit; 

		const search = db.prepare(`
			SELECT Problems.* 
			FROM Problems
			INNER JOIN Problems_fts ON Problems.problem_id = Problems_fts.rowid
			WHERE Problems_fts MATCH (@query)
			ORDER BY rank
			LIMIT (@limit) OFFSET (@offset);
		`);

		const results = search.all({ query: (query + "*"), limit: 50, offset: offset });

		// reconstruction for navigation
		const back = new URL("http://localhost:8000/search");
		back.searchParams.set("q", query); 
		back.searchParams.set("o", (page - 1).toString()); 

		const forward = new URL("http://localhost:8000/search");
		forward.searchParams.set("q", query); 
		forward.searchParams.set("o", (page + 1).toString()); 

		if (search) {
			res.render("search", { 
				activity: "Searching...", 
				results: results, 
				userSearch: req.query.q,
				back: back.toString(),
				forward: forward.toString(),
			});
		} else{
			res.status(404).send("Data not found");
		}
	});

	return router;
}
