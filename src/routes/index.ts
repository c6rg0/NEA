//index.ts
import express from "express";
import path from "path";

import submitSignup from "./submit-signup";
import submitLogin from "./submit-login";
import createProblem from "./create-problem";
import searchRequest from "./search-request";
import browse from "./browse";
import quiz from "./quiz";
import solve from "./solve";
import session from "./get-session";

const router = express.Router();

router.use("/submit-signup", submitSignup);
router.use("/submit-login", submitLogin);
router.use("/create-problem", createProblem);
router.use("/search-request", searchRequest);
router.use("/browse", browse);
router.use("/solve/:id", quiz);
router.use("/solve/0", solve);
router.use("/get-session", session);

router.get("/", (req, res) => {
	if (!req.session.user){
		res.render('index', { login_status: "Not logged in" } );
	}
	if (req.session.user){
		let login_status = req.session.user;
		res.render('index', { login_status: login_status } );
	}
});


export default router;
