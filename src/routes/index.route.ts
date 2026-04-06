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

	return ROUTER;
}
