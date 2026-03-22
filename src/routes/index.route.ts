import { Request, Response, Router } from "express";

export function indexRouter(){
	const router = Router();

	router.get("/", (req: Request, res: Response) => {
		if (!req.session.user){
			res.render("index", { login_status: "Not logged in", login: false} );
			return;
		}
		if (req.session.user){
			let login_status = req.session.user;
			res.render("index", { login_status: login_status, login: true } );
			return;
		}
	});

	return router;
}
