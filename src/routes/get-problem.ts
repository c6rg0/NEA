//problem.ts
import express from "express";

const router = express.Router();

import Database from "better-sqlite3";
const regex_problems = Database("./database/regex_problems.db", { verbose: console.log });

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

interface types {
	example: string,
	answer: string,
}


router.get("/:id", async(req, res) => {
	const id  = req.params.id;
	console.log(req.params.id);

	try{
		const response  = regex_problems.prepare(`SELECT answer, example FROM Problems WHERE problem_id = ?;`).get(id);
		console.log("answer = " + (response as types).answer);

		return res.json(response);

	} catch(error){
		return res.status(500).send(error + ": unkown error");
	}
	
});

export default router;

