import { Request, Response, Router } from 'express'
import bcrypt from "bcrypt";
import sqlite3 from "better-sqlite3";

export function loginRouter(DB: sqlite3.Database){
	const ROUTER = Router();

	interface userPassword {
		password: string;
	}

	// req is required, despite the lsp stating it's not
	ROUTER.get("/", (req: Request, res: Response) => {
		res.render("login");
	});

	ROUTER.post("/", async (req: Request, res: Response) => {
		const USER_INPUT = req.body;

		if (!USER_INPUT || !USER_INPUT.username || !USER_INPUT.password) {
			return res.status(412).json({ error: "Required credentials are missing" });
		}

		const RESULT = DB.prepare(`
			SELECT password FROM Users 
			WHERE username = ?
		`).get(USER_INPUT.username) as userPassword | undefined;
		
		if (!RESULT) {
			return res.status(404).json({ error: "User doesn't exist" });
		}

		const INPUT_PASS: string = USER_INPUT.password;
		const HASHED_PASS: string = RESULT.password; 

		async function verifyPassword(INPUT_PASS:
			string, HASHED_PASS: string): Promise<boolean> {

			const MATCH: boolean = await bcrypt.
			compare(INPUT_PASS, HASHED_PASS);

			return MATCH;
		}

		const MATCH: boolean = await verifyPassword(INPUT_PASS, HASHED_PASS);

		if (MATCH) {
			req.session.user = USER_INPUT.username;
			return res.status(200).send();

		} else {
			return res.status(401).json({ error: "Incorrect password or username" });
		}
	});


	ROUTER.all("/", (req: Request, res: Response) => {
		res.set("Allow", "GET, POST");
		res.status(405).json({ error: "HTTP method not allowed" });
	});

	return ROUTER;
}
