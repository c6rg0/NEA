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
			return res.status(304).json({ error: "Required fields are missing." });
		}

		const existingUser = DB.prepare(`
			SELECT username FROM Users 
			WHERE username = ?
		`).get(USER_INPUT.username);

		if (existingUser) {
			res.status(409).json({ error: "Username already exists" });
		} else {

			let PASS_LENGTH: number = USER_INPUT.password.length;

			if (PASS_LENGTH < 6) {
				return res.status(406).json({ error: "Password is too short" });
			} else {

				const PASS = USER_INPUT.password;
				
				async function hashPassword(PASS: string): Promise<string> {
					const SALT_ROUNDS = 10;
					const HASHED_PASS = await bcrypt.hash(PASS, SALT_ROUNDS);
					return HASHED_PASS;
				}

				const HASHED_PASS = await hashPassword(PASS);

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

				res.redirect("/login");
				return;
			}
		}
	});

	ROUTER.all("/", (req: Request, res: Response) => {
		res.set("Allow", "GET, POST");
		res.status(405).json({ error: "HTTP method not allowed" });
	});

	return ROUTER;
}
