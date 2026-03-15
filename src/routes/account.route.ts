import express from "express";
const router = express.Router();

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

router.get("/", (req, res) => {
	if (!req.session.user){
		res.render("account", { login: false });
	}
	if (req.session.user){
		let login_status = req.session.user;
		res.render("account", { login_status: login_status, login: true });
	}
});

export default router;
