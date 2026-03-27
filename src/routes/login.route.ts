import { Request, Response, Router } from 'express'
import bcrypt from "bcrypt";
import sqlite3 from "better-sqlite3";

export function loginRouter(db: sqlite3.Database){

	const router = Router();

	interface userPassword {
		password: string;
	}

	// req is required, despite the lsp stating it's not
	router.get("/", (req: Request, res: Response) => {
		res.render("login");
	});

	router.post("/", async (req, res) => {
		const userInput = req.body;

		if (!userInput || !userInput.username || !userInput.password) {
			return res.status(204).
			send("Required credentials are missing.");
		}

		const result = db.prepare(`
			SELECT password FROM Users 
			WHERE username = ?
		`).get(userInput.username) as userPassword | undefined;
		
		if (!result || !result.password) {
			return res.status(401).
			send("Invalid username or password");
		}

		const inputPass: string = userInput.password;
		const hashedPass: string = result.password; 

		async function verifyPassword(inputPass:
			string, hashedPass: string): Promise<boolean> {

			const match: boolean = await bcrypt.
			compare(inputPass, hashedPass);

			return match;
		}

		const match: boolean = await verifyPassword(inputPass, hashedPass);

		if (match) {
			req.session.user = userInput.username;
			res.redirect("/");
			return;

		} else {
			res.status(401).send("Incorrect password or username.");
			return;
		}
	});

	return router;
}
