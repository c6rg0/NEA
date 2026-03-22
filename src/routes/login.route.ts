import { Request, Response, Router } from 'express'
import bcrypt from "bcrypt";
import Database from "better-sqlite3";

export function loginRouter(
	regex_problems: Database.Database){

	const router = Router();

	interface userPassword {
		password: string;
	}

	// req is required, despite the lsp stating it's not
	router.get("/", (req: Request, res: Response) => {
		res.render("login");
	});

	router.post("/", async (req, res) => {
		const user_input = req.body;
		if (!user_input || !user_input.username) {
			return res.status(204).
			send("Username is required");
		}
		if (!user_input || !user_input.password) {
			return res.status(204).
			send("Password is required");
		}

		const result = regex_problems.prepare(`
			SELECT password FROM Users 
			WHERE username = ?
		`).get(user_input.username) as userPassword | undefined;
		
		if (!result || !result.password) {
			return res.status(401).
			send("Invalid username or password");
		}

		const parsed_pass = user_input.password;
		const hashed_pass = result.password; 

		async function verifyPassword(parsed_pass:
			string, hashed_pass: string): Promise<boolean> {

			const check = await bcrypt.
			compare(parsed_pass, hashed_pass);

			return check;
		}

		const check = await verifyPassword(parsed_pass, hashed_pass);

		if (check) {
			req.session.user = user_input.username;
			res.redirect("/");
			return;

		} else {
			res.status(401).send("Unauthorized");
			return;
		}
	});

	return router;
}
