import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";
import bcrypt from "bcrypt";

export function signupRouter(DB: sqlite3.Database){
	const ROUTER = Router();

	ROUTER.get("/", (req: Request, res: Response) => {
		res.render("signup");
	});

	ROUTER.post("/", async (req: Request, res: Response) => {
		const USER_INPUT = req.body;

		if (!USER_INPUT || !USER_INPUT.username || !USER_INPUT.password) {
			return res.status(412).json({ error: "Required fields are missing" });
		}

		const existingUser = DB.prepare(`
			SELECT username FROM Users 
			WHERE username = ?
		`).get(USER_INPUT.username);

		if (existingUser) {
			return res.status(409).json({ error: "Username already exists" });
		} 

		const ERROR = testInput(USER_INPUT);

		if (ERROR === true){
			return res.status(412).send();
		}
			
		async function hashPassword(PASS: string): Promise<string> {
			const SALT_ROUNDS = 10;
			const HASHED_PASS = await bcrypt.hash(PASS, SALT_ROUNDS);
			return HASHED_PASS;
		}

		const HASHED_PASS = await hashPassword(USER_INPUT.password);

		const INSERT = DB.prepare(`
			INSERT INTO Users (username, password) 
			VALUES (@username , @password);
		`);

		try {
			INSERT.run({ username: USER_INPUT.username, password: HASHED_PASS });

		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: err });
		}

		return res.status(200).send();
	});

	interface inputTypes {
		username: string,
		password: string,
	}

	function testInput(USER_INPUT: inputTypes){
		if ((USER_INPUT.password).length < 6) {
			return true;
		}

		if ((USER_INPUT.password).length < 6) {
			return true;
		}

		if ((USER_INPUT.username).length > 16) {
			return true;
		}

		let num = false;
		let symbol = false;
		let lower = false;
		let upper = false;

		for (let i = 0; i < USER_INPUT.password.length; i++){
			const char: string = USER_INPUT.password[i];

			if (char >= "0" && char <= "9"){
				num = true;
			} if (!/[a-zA-Z0-9]/.test(char)){
				symbol = true;
			} if (/[a-z]/.test(char)){
				lower = true;
			} if (/[A-Z]/.test(char)){
				upper = true;
			}
		}

		if (num === false || symbol === false || lower === false || upper === false){
			return true;
		}

		return false;

	}

	ROUTER.all("/", (req: Request, res: Response) => {
		res.set("Allow", "GET, POST");
		res.status(405).json({ error: "HTTP method not allowed" });
	});

	return ROUTER;
}
