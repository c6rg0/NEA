//submit-login.ts
import express from "express";
import path from "path";
import bcrypt from 'bcrypt';

const router = express.Router();

import Database from 'better-sqlite3';
const quiz_db = Database('database/quiz.db', { verbose: console.log });
const account_db = Database('database/account.db', { verbose: console.log });

declare module 'express-session' {
  interface SessionData {
    user: { username: string };
  }
}

interface userPassword {
	password: string;
}

router.post('/', async (req, res) => {
	account_db.prepare("PRAGMA table_info(Meta)").all();
	const user_input = req.body;
	console.log("request:", user_input);
	if (!user_input || !user_input.username) {
		console.log("400: Username is required");
		return res.status(400).send('Username is required');
	}
	if (!user_input || !user_input.password) {
		console.log("400: Password is required");
		return res.status(400).send('Password is required');
	}

	const result = account_db.prepare
	(`SELECT password FROM Logins WHERE username = ?`)
	.get(user_input.username) as userPassword | undefined;
	
	if (!result || !result.password) {
		return res.status(401).send('Invalid username or password.');
	}

	const parsed_pass = user_input.password;
	const hashed_pass = result.password; 

	async function verifyPassword(parsed_pass: string, hashed_pass: string): Promise<boolean> {
		const check = await bcrypt.compare(parsed_pass, hashed_pass);
		return check;
	}

	const check = await verifyPassword(parsed_pass, hashed_pass);

	if (check) {
		req.session.user = { username: user_input.username };
		console.log("Login success!");
		console.log();

		res.redirect("/login-success");
	} else {
		console.log("401: Incorrect");
		console.log();
		res.redirect("/login");
	}
});

export default router;

