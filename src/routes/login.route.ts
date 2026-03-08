//submit-login.ts
import express from "express";
// import path from "path";
import bcrypt from 'bcrypt';

const router = express.Router();

import Database from 'better-sqlite3';
const regex_problems = Database('./database/regex_problems.db', { verbose: console.log });

declare module 'express-session' {
  interface SessionData {
    user: { username: string };
  }
}

interface userPassword {
	password: string;
}

router.post('/', async (req, res) => {
	const user_input = req.body;
	// console.log("request:", user_input);
	if (!user_input || !user_input.username) {
		return res.status(204).send('Username is required');
	}
	if (!user_input || !user_input.password) {
		return res.status(204).send('Password is required');
	}

	const result = regex_problems.prepare
	(`SELECT password FROM Users WHERE username = ?`)
	.get(user_input.username) as userPassword | undefined;
	
	if (!result || !result.password) {
		return res.status(401).send('Invalid username or password');
	}

	const parsed_pass = user_input.password;
	const hashed_pass = result.password; 

	async function verifyPassword(parsed_pass: string, hashed_pass: string): Promise<boolean> {
		const check = await bcrypt.compare(parsed_pass, hashed_pass);
		return check;
	}

	const check = await verifyPassword(parsed_pass, hashed_pass);

	if (check) {
		req.session.user = user_input.username;
		console.log("res.status(200).send(Authentication successfull);");
		// res.status(200).send("Authentication successfull");
		res.redirect("/");
		return;
	} else {
		console.log("res.status(401).send(Unauthorized);");
		res.status(401).send("Unauthorized");
		return;
	}
});

export default router;

