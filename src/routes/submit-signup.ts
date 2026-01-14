//submit-signup.ts
import express from "express";
import path from "path";
import bcrypt from 'bcrypt';

const router = express.Router();

import Database from 'better-sqlite3';
const quiz_db = Database('./database/quiz.db', { verbose: console.log });
const account_db = Database('./database/account.db', { verbose: console.log });

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
		return console.log("400: Username is required");
	}

	if (!user_input || !user_input.password) {
		return console.log("400: Password is required");
	}
	
	const existing_user = account_db.prepare(`SELECT username FROM Logins WHERE username = ?`).get(user_input.username);
	if (existing_user) {
		console.log("409: Username already exists");
		console.log();
		return res.redirect("/signup");
	}
	else{
		let passLength: number = user_input.password.length;
		if ( passLength < 6) {
			console.log("Password too short");
			return res.redirect("/signup");
		} else {
			const parsed_pass = user_input.password;
			
			async function hashPassword(parsed_pass: string): Promise<string> {
				const saltRounds = 10;
				const hashed_pass = await bcrypt.hash(parsed_pass, saltRounds);
				return hashed_pass;
			}

			const hashed_pass = await hashPassword(parsed_pass);
			console.log(hashed_pass);

			const insert = account_db.prepare(`
				INSERT INTO Logins (username, password) VALUES
					(@username , @password);`);
			try {
				insert.run({ username: user_input.username, password: hashed_pass });
			} catch (err) {
				return console.log(err);
			}
			console.log("New login inserted successfully!");
			console.log();
			return res.redirect('/signup-success');
		}
	}
});

export default router;
