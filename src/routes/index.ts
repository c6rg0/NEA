//index.ts
import express from "express";

import submitSignup from "./submit-signup";
import submitLogin from "./submit-login";
import createProblem from "./create-problem";
import searchRequest from "./search-request";
import browse from "./browse";
import problem from "./problem";
import session from "./get-session";

const router = express.Router();

router.use("/submit-signup", submitSignup);
router.use("/submit-login", submitLogin);
router.use("/create-problem", createProblem);
router.use("/search-request", searchRequest);
router.use("/browse", browse);
router.use("/problem/", problem);
router.use("/get-session", session);

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
