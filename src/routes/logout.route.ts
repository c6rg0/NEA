import express from "express";
const router = express.Router();

declare module "express-session" {
  interface SessionData {
    user: { username: string };
  }
}

router.get("/", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.error("Error destroying session", err);
			return res.status(500).send("Error destroying session");
		} 

		res.clearCookie("connect.sid");
		// cookiePerm = false; // leftover from /disable-cookies route
		res.redirect("/");
	}
)});

export default router;
