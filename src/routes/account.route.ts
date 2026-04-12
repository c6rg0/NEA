import { Request, Response, Router } from 'express'

export function accountRouter(){
	const ROUTER = Router();

	ROUTER.get("/", (req: Request, res: Response) => {
		if (!req.session.user){
			res.render("account", { login: false });
			return;
		}
		res.render("account", { login_status: req.session.user, login: true });
	});

	ROUTER.all("/", (req: Request, res: Response) => {
		res.set("Allow", "GET");
		res.status(405).json({ error: "HTTP nethod not allowed" });
	});

	return ROUTER;
}

