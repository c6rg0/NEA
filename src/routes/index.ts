//index.ts
import express from "express";

import signup from "./signup.route";
import login from "./login.route";
import create from "./create.route";
import search from "./search.route";
import browse from "./browse.route";
import solve from "./solve.route";
import solution from "./solution.route";
import session from "./session.route";
import attempt from "./attempt.route";
import user from "./user.route";

const router = express.Router();

router.use("/signup", signup);
router.use("/login", login);
router.use("/create", create);
router.use("/search/", search);
router.use("/browse", browse);
router.use("/solve", solve);
router.use("/solution", solution);
router.use("/session", session);
router.use("/attempt", attempt);
router.use("/user", user);

router.get("/", (req, res) => {
	if (!req.session.user){
		res.render('index', { login_status: "Not logged in", login: false} );
	}
	if (req.session.user){
		let login_status = req.session.user;
		res.render('index', { login_status: login_status, login: true } );
	}
});


export default router;
