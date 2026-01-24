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
	quiz_db.prepare("PRAGMA table_info(Meta)").all();
	let search  = quiz_db.prepare(`SELECT * FROM Table(Meta) name ORDER BY Asc;`);
	let search_result = search.run();
	res.render('browse', { results: 'search_result' } );
});

export default router;

