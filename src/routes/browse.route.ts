import { Request, Response, Router } from 'express'
import Database from "better-sqlite3";

export function browseRouter(regex_problems: Database.Database){
	const router = Router();

	router.get("/", async (req: Request, res: Response) => {
		
		const search  = regex_problems.prepare(`
			SELECT problem_id, title, elo, times_attempted 
			FROM Problems 
			LIMIT 10;`);
		const search_result = search.all();
		
		res.render("browse", { results: search_result } );
		return;
	});

	return router;
}
