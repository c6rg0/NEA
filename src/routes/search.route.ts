import { Request, Response, Router } from 'express'
import sqlite3 from "better-sqlite3";

export function searchRouter(db: sqlite3.Database){
	const ROUTER = Router();

	ROUTER.get("/", async (req: Request, res: Response) => {
		const UNSANITIZED_QUERY = req.query.q;

		// Elo ranges to filter
		const QUERY_ELO_UPPER = req.query.fu; // "fu": filter upper
		const QUERY_ELO_LOWER = req.query.fl; // ...: ... lower

		let eloUpper: number; 
		let eloLower: number = 0;

		let conditions = "elo > " + eloLower; // + "AND elo < (@upper)";

		if (QUERY_ELO_LOWER){
			const PARSED = Number(QUERY_ELO_LOWER);
			if (!isNaN(PARSED)){
				eloLower = PARSED;
				conditions = "elo > " + eloLower; // + "AND elo < (@upper)";
			}
		} if (QUERY_ELO_UPPER){
			const PARSED = Number(QUERY_ELO_UPPER);
			if (!isNaN(PARSED)){
				eloUpper = PARSED;
				conditions = "elo > " + eloLower + " AND elo < " + eloUpper;
			}
		} 

		const QUERY_ORDER = req.query.order; // "DESC"(defualt)/"ASC"
		let order: string = "DESC";
		let orderWhitelist: string[];

		if (QUERY_ORDER){
			orderWhitelist = ["DESC", "ASC"];
			if (orderWhitelist.includes(QUERY_ORDER.toString())){
				order = QUERY_ORDER.toString();
			}
		} 

		const QUERY_SORT = req.query.sort; 
		let sort: string = "time_created";
		let sortWhitelist: string[];

		if (QUERY_SORT){
			sortWhitelist = ["elo", "time_created", "times_attempted"]; 
			if (sortWhitelist.includes(QUERY_SORT.toString())){
				sort = QUERY_SORT.toString();
			} else {
				return res.status(400).send("Invalid sort option");
			}
		}

		sort = sort + " " + order;

		// Managing limit & offset relative to page
		const QUERY_PAGE = req.query.page;

		let page: number = 1;
		if (QUERY_PAGE){
			const PARSED = Number(QUERY_PAGE);
			if (!isNaN(PARSED)){
				page = PARSED;
			}
		}

		const LIMIT = 50;
		const OFFSET = (page - 1) * LIMIT; 

		let query: string = "";
		let inner_join = "";
		let columns: string = "problem_id, title, creator, time_created, elo, times_attempted";
		let activity: string = "Searching";

		if (UNSANITIZED_QUERY){
			query = UNSANITIZED_QUERY.toString();
			const SYMBOL_STRIP: RegExp = /[^a-zA-Z0-9 ]/g;
			query = query.replace(SYMBOL_STRIP, "").trim().slice(0, 100);
			query = query + "*";

			inner_join = "INNER JOIN Problems_fts ON Problems.problem_id = Problems_fts.rowid";
			columns = "Problems.*";
			conditions = "Problems_fts MATCH (@query)";
			sort = "rank";

			activity = "after_query";
		} 
		
		let results: sqlite3.RunResult | unknown[]
		= db.prepare(`
			SELECT ${columns}
			FROM Problems
			${inner_join}
			WHERE ${conditions}
			ORDER BY ${sort}
			LIMIT (@limit) OFFSET (@offset);
		`).all({ 
			query: query, 
			limit: LIMIT, 
			offset: OFFSET 
		});

		res.render("search", { 
			activity: activity, 
			results: results, 
			userSearch: req.query.q,
		});
	});

	return ROUTER;
}
