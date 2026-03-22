import express from "express";

declare module "express-session" {
	interface SessionData {
		user: { username: string };
	}
}

import Database from "better-sqlite3";
const regex_problems = Database("./database/regex_problems.db", { verbose: console.log });

import { signupRouter} from "./signup.route";
import { loginRouter } from "./login.route";
import { createRouter } from "./create.route";
import { redirectRouter } from "./redirect.route";
import { searchRouter } from "./search.route";
import { browseRouter } from "./browse.route";
import { solveRouter } from "./solve.route";
import { solutionRouter } from "./solution.route";
import { sessionRouter } from "./session.route";
import { attemptRouter } from "./attempt.route";
import { accountRouter } from "./account.route";
import { logoutRouter } from "./logout.route";
import { userRouter } from "./user.route";
import { leaderboardRouter } from "./leaderboard.route";

const account = accountRouter();
const attempt = attemptRouter(regex_problems);
const browse = browseRouter(regex_problems);
const create = createRouter(regex_problems);
const leaderboard = leaderboardRouter(regex_problems);
const login = loginRouter(regex_problems);
const logout = logoutRouter();
const redirect = redirectRouter(regex_problems);
const search = searchRouter(regex_problems);
const session = sessionRouter();
const signup = signupRouter(regex_problems);
const solve = solveRouter(regex_problems);
const solution = solutionRouter(regex_problems);
const user = userRouter(regex_problems);

const router = express.Router();
router.use("/signup", signup);
router.use("/login", login);
router.use("/create", create);
router.use("/redirect/", redirect);
router.use("/search/", search);
router.use("/browse", browse);
router.use("/solve", solve);
router.use("/solution", solution);
router.use("/session", session);
router.use("/attempt", attempt);
router.use("/account", account);
router.use("/logout", logout);
router.use("/user", user);
router.use("/leaderboard", leaderboard);

router.get("/", (req, res) => {
	if (!req.session.user){
		res.render("index", { login_status: "Not logged in", login: false} );
	}
	if (req.session.user){
		let login_status = req.session.user;
		res.render("index", { login_status: login_status, login: true } );
	}
});

export default router;
