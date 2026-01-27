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

interface fetch {
	id: string;
}

router.get("/:id", async (req, res) => {
	let id = req.params.id;
	quiz_db.prepare("PRAGMA table_info(Meta)").all();
	const quiz_fetch  = quiz_db.prepare(`SELECT * FROM questions;`).get(id) as fetch | undefined;
	res.render('browse', { results: quiz_fetch } );

});

export default router;

