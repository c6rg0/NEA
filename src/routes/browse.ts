//browse.ts
import express from "express";
import path from "path";

const router = express.Router();

import Database from "better-sqlite3";
const quiz_db = Database("./database/quiz.db", { verbose: console.log });

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

router.get("/", async (req, res) => {
	
	const search  = quiz_db.prepare(`SELECT id, name FROM Meta LIMIT 10;`);
	const search_result = search.all();
	console.log(search_result);
	
	// const search_result = ["JavaScript quiz", "Rust quiz", "Cybersec quiz", "C++ quiz (not this one please)"];
	
	res.render("browse", { results: search_result } );
});

export default router;

