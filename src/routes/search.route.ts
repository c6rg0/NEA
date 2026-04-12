import { Request, Response, Router } from 'express'
import sqlite3 from "better-sqlite3";

export function searchRouter(db: sqlite3.Database){
	const ROUTER = Router();

	ROUTER.get("/", async (req: Request, res: Response) => {
		const QUERY_ELO_UPPER = req.query.fu as string; // "fu": filter upper
		const QUERY_ELO_LOWER = req.query.fl as string; // ...: ... lower
		let conditions = assignFilters(QUERY_ELO_UPPER, QUERY_ELO_LOWER);

		const QUERY_ORDER = req.query.order as string; 
		let order = assignOrder(QUERY_ORDER);

		const QUERY_SORT = req.query.sort as string; 
		let sort = assignSort(QUERY_SORT, res, order);

		const QUERY_PAGE = req.query.page as string;
		const LIMIT = 50;
		const OFFSET = assignOffset(QUERY_PAGE, LIMIT)

		let query: string = "";
		let innerJoin = "";
		let columns: string = "problem_id, title, creator, time_created, elo, times_attempted";
		let activity: string = "Searching";

		const UNSANITIZED_QUERY = req.query.q as string;

		if (UNSANITIZED_QUERY){
			query = UNSANITIZED_QUERY.toString();
			const SYMBOL_STRIP: RegExp = /[^a-zA-Z0-9 ]/g;
			query = query.replace(SYMBOL_STRIP, "").trim().slice(0, 100);
			query = query + "*";

			innerJoin = "INNER JOIN Problems_fts ON Problems.problem_id = Problems_fts.rowid";
			columns = "Problems.*";
			conditions = "Problems_fts MATCH (@query)";
			sort = "rank";

			activity = "after_query";
		} 
		
		let results: sqlite3.RunResult | unknown[] = db.prepare(`
			SELECT ${columns}
			FROM Problems
			${innerJoin}
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

	function assignFilters(QUERY_ELO_UPPER: string, QUERY_ELO_LOWER: string){
		let eloUpper: number; 
		let eloLower: number = 0;

		let conditions = "elo > " + eloLower; // + "AND elo < (@upper)";

		if (QUERY_ELO_LOWER){
			const PARSED = Number(QUERY_ELO_LOWER);
			if (!isNaN(PARSED)){
				eloLower = PARSED;
				conditions = "elo > " + eloLower;
			}
		} if (QUERY_ELO_UPPER){
			const PARSED = Number(QUERY_ELO_UPPER);
			if (!isNaN(PARSED)){
				eloUpper = PARSED;
				conditions = "elo > " + eloLower + " AND elo < " + eloUpper;
			}
		} 
		
		return conditions;
	}

	function assignOrder(QUERY_ORDER: string){
		let order: string = "DESC";
		let orderWhitelist: string[];

		if (QUERY_ORDER){
			orderWhitelist = ["DESC", "ASC"];
			if (orderWhitelist.includes(QUERY_ORDER.toString())){
				order = QUERY_ORDER.toString();
			}
		} 

		return order;
	}

	function assignSort(QUERY_SORT: string, res: Response, order: string){
		let sort: string = "time_created";
		let sortWhitelist: string[];

		if (QUERY_SORT){
			sortWhitelist = ["elo", "time_created", "times_attempted"]; 
			if (sortWhitelist.includes(QUERY_SORT.toString())){
				sort = QUERY_SORT.toString();
			} else {
				return res.status(400).json({ error: "Invalid sort option" });
			}
		}

		return (sort + " " + order);
	}

	function assignOffset(QUERY_PAGE: string, LIMIT: number, page = 1){
		if (QUERY_PAGE){
			const PARSED = Number(QUERY_PAGE);
			if (!isNaN(PARSED)){
				page = PARSED;
			}
		}

		return ((page - 1) * LIMIT); 
	}

	ROUTER.all("/", (req: Request, res: Response) => {
		res.set("Allow", "GET");
		res.status(405).json({ error: "HTTP method not allowed" });
	});

	return ROUTER;
}
