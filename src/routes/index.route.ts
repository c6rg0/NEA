import { Request, Response, Router } from "express";

export function indexRouter(){
	const ROUTER = Router();

	ROUTER.get("/", (req: Request, res: Response) => {
		if (!req.session.user){
			res.render("index", { login_status: "Not logged in", login: false} );
			return;
		}
		if (req.session.user){
			let loginStatus = req.session.user;
			res.render("index", { login_status: loginStatus, login: true } );
			return;
		}
	});

	ROUTER.all("/", (req: Request, res: Response) => {
		res.set("Allow", "GET");
		res.status(405).json({ error: "HTTP method not allowed" });
	});

	return ROUTER;
}
