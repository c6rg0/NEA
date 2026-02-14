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

interface fetch {
	id: string;
}

router.get("/:id", async(req, res) => {
	const id  = req.params.id;
	console.log(req.params.id);

	try{
		const response  = regex_problems.prepare(`SELECT * FROM Problems WHERE problem_id = ?;`).get(id) as fetch | undefined;

		return res.send({response: response});

	} catch(error){
		return res.status(500).send(error + ": unkown error");
	}
	
});

export default router;

