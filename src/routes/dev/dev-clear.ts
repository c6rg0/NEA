//dev-clear.ts
import express from "express";
import path from "path";

const router = express.Router();

import Database from 'better-sqlite3';
const quiz_db = Database('./database/quiz.db', { verbose: console.log });
const account_db = Database('./database/account.db', { verbose: console.log });

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

router.get('/', async (req, res) => {
	/* Validation should be required*/
	res.render('dev-clear', { name: 'dev-clear' } );
	quiz_db.prepare("PRAGMA table_info(Meta)").all();
	account_db.prepare("PRAGMA table_info(Meta)").all();
	const drop_quizes = quiz_db.prepare('DELETE FROM Logins;');
	const drop_logins = account_db.prepare('DELETE FROM Logins;');
	drop_quizes.run();
	drop_logins.run();

});

export default router;

