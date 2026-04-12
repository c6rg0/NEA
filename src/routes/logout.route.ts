import { Request, Response, Router } from 'express'

export function logoutRouter(){
	const ROUTER = Router();

	// Probably should be a DELETE route, but GET is more intuitive 
	// since you can call with href
	ROUTER.get("/", (req: Request, res: Response) => {
		req.session.destroy((err) => {
			if (err) {
				console.log("Error destroying session", err);

				return res.status(500).json({ 
					error: "Error destroying session" 
				});
			} 

			res.clearCookie("connect.sid");
			// cookiePerm = false; // leftover from /disable-cookies route
			res.redirect("/");
			return;
		}
	)});

	ROUTER.all("/", (req: Request, res: Response) => {
		res.set("Allow", "GET");
		res.status(405).json({ 
			error: "HTTP method not allowed" 
		});
	});

	return ROUTER;
}
