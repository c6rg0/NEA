import { Request, Response, Router } from 'express'

export function logoutRouter(){
	const ROUTER = Router();

	// This could be a DELETE request 
	ROUTER.post("/", (req: Request, res: Response) => {
		req.session.destroy((err) => {
			if (err) {
				console.log("Error destroying session", err);

				return res.status(500).json({ 
					error: "Error destroying session" 
				});
			} 

			res.clearCookie("connect.sid");
			// cookiePerm = false; // leftover from /disable-cookies route
			return res.status(200).send();
		}
	)});

	ROUTER.all("/", (req: Request, res: Response) => {
		res.set("Allow", "POST");
		res.status(405).json({ 
			error: "HTTP method not allowed" 
		});
	});

	return ROUTER;
}
