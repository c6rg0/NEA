import { Request, Response, Router } from "express";

export function sessionRouter(){
	const router = Router();

	router.get("/", (req: Request, res: Response) => {
		if (req.session.user) {
			res.send("Session data: " + JSON.stringify(req.session.user));
		} else {
			res.send("No session data found");
		}
	});

	return router;
}
