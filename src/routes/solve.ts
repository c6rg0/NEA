//play.ts
import express from "express";

const router = express.Router();

import Database from "better-sqlite3";
const regex_problems = Database("./database/regex_problems.db", 
			 { verbose: console.log });

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

const app = express();

// [/play/0]: quiz testing route
router.get("/", async (req, res) => {
	res.render('solve', { name: 'play' } );

});

export default router;

