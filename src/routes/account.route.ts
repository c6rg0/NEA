import { Request, Response, Router } from 'express'

export function accountRouter(){
	const router = Router();

	router.get("/", (req: Request, res: Response) => {
		if (!req.session.user){
			res.render("account", { login: false });
			return;
		}
		res.render("account", { login_status: req.session.user, login: true });
	});

	return router;
}

