import { Request, Response, Router } from "express";
import sqlite3 from "better-sqlite3";
import bcrypt from "bcrypt";

export function signupRouter(db: sqlite3.Database){
	const router = Router();

	router.get("/", (req: Request, res: Response) => {
		res.render("signup");
	});

	router.post("/", async (req: Request, res: Response) => {
		const userInput = req.body;

		if (!userInput || !userInput.username || !userInput.password) {
			return res.status(304).send("Required fields are missing.");
		}

		const existingUser = db.prepare(`
			SELECT username FROM Users 
			WHERE username = ?
		`).get(userInput.username);

		if (existingUser) {
			res.status(409).send("Username already exists");
		} else {

			let passLength: number = userInput.password.length;

			if ( passLength < 6) {
				return res.status(406).send("Password is too short");
			} else {

				const pass = userInput.password;
				
				async function hashPassword(pass: string): Promise<string> {
					const saltRounds = 10;
					const hashedPass = await bcrypt.hash(pass, saltRounds);
					return hashedPass;
				}

				const hashedPass = await hashPassword(pass);

				const insert = db.prepare(`
					INSERT INTO Users (username, password) 
					VALUES (@username , @password);
				`);

				try {
					insert.run({ username: userInput.username, password: hashedPass });
				} catch (err) {
					console.log(err);
					return res.status(500).send(err);
				}
				res.redirect("/login");
				return;
			}
		}
	});

	return router;
}
