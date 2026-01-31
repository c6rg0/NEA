//play.ts
import express from "express";
import path from "path";

const router = express.Router();

import Database from "better-sqlite3";
const quiz_db = Database("./database/quiz.db", 
			 { verbose: console.log });
const account_db = Database('./database/account.db', 
			    { verbose: console.log });

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

const app = express();

// [/play/0]: quiz testing route
router.get("/", async (req, res) => {
	res.render('play', { name: 'play' } );

});

export default router;

