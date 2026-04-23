import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";

export function createRouter(DB: sqlite3.Database){
	const ROUTER = Router();

	ROUTER.get("/", (req: Request, res: Response) => {
		if (req.session.user){
			res.render("create", { login: true } );
			return;
		}

		res.render("create", { login: false } );
		return;
	});

	ROUTER.post("/", (req: Request, res: Response) => {
		const USER_INPUT = req.body;
		
		if (req.session.user) {
			if (!USER_INPUT.title || !USER_INPUT.instruction || !USER_INPUT.test_data || !USER_INPUT.answer){
				return res.status(412).json({ error: "Missing required values" });
			} 

			// testing regex
			try {
				const ANSWER_REGEX = new RegExp(USER_INPUT.answer);
				if (!ANSWER_REGEX.test(USER_INPUT.test_data)){
					return res.status(412).json({ error: "Invalid regex" });
				}
			} catch (error){
				return res.status(412).json({ error: error });
			}

			const PROBLEM_INSERT = DB.prepare(`
				INSERT INTO Problems 
				(title, creator, instruction, test_data, answer) 
				VALUES
				(@title, @creator, @instruction, @test_data, @answer);
			`);

			PROBLEM_INSERT.run({
				title: USER_INPUT.title, 
				creator: req.session.user, 
				instruction: USER_INPUT.instruction, 
				test_data: USER_INPUT.test_data,
				answer: USER_INPUT.answer
			});
			
			return res.status(200).send();
		} 

		return res.status(401).json({ error: "Please login first" });
	});

	ROUTER.all("/", (req: Request, res: Response) => {
		res.set("Allow", "GET, POST");
		res.status(405).json({ error: "HTTP nethod not allowed" });
	});

	return ROUTER;
}
