//get-session.ts
import express from "express";
const router = express.Router();

import Database from "better-sqlite3";
const account_db = Database("./database/account.db", { verbose: console.log });

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

router.get("/get-session", (req, res) => {
	if (req.session.user) {
		res.send("Session data: " + JSON.stringify(req.session.user));
	} else {
		res.send("No session data found");
	}
});


export default router;

