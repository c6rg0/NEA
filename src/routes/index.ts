//index.ts
import express from "express";
import path from "path";

import submitSignup from "./submit-signup";
import submitLogin from "./submit-login";
import submitQuizTitle from "./submit-title";
import submitQuizContent from "./submit-content";
import devMenu from "./dev/dev";
import dropDatabase from "./dev/dev-clear";
import searchRequest from "./search-request";
import browse from "./browse";
import quiz from "./quiz";
import play from "./play";
import session from "./get-session";

const router = express.Router();

router.use("/submit-signup", submitSignup);
router.use("/submit-login", submitLogin);
router.use("/submit-title", submitQuizTitle);
router.use("/submit-content", submitQuizContent);
router.use("/dev", devMenu);
router.use("/dev/clear", dropDatabase);
router.use("/search-request", searchRequest);
router.use("/browse", browse);
router.use("/quiz/:id", quiz);
router.use("/play", play);
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
