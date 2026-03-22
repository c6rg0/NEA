import { Request, Response, Router } from 'express'

export function logoutRouter(){
	const router = Router();

	router.get("/", (req: Request, res: Response) => {
		req.session.destroy((err) => {
			if (err) {
				console.error("Error destroying session", err);

				return res.status(500).
				send("Error destroying session");
			} 

			res.clearCookie("connect.sid");
			// cookiePerm = false; // leftover from /disable-cookies route
			res.redirect("/");
			return;
		}
	)});

	return router;
}
