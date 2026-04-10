import express from "express";
const APP = express();
APP.set("view engine", "ejs");

import bodyParser from "body-parser";
APP.use(express.json());
APP.use(bodyParser.urlencoded({extended: true}));

import path from "path";
APP.use(express.static(path.join(__dirname, "public")));

import session from "express-session";
declare module "express-session" {
	interface SessionData {
		user: string,
	}
}

const SESSION_MIDDLEWARE = session({
	// date +%s%N | sha512sum
	secret: "7f8b901b7b70580f29b1e64296c3ba20e0dc17a29bf50b9eba302e3688cb12b1f666569ae6b412a43d63af9ffa5400833fdac5e1c30abdd8e1a94c06a665dd6b",
	resave: false,
	saveUninitialized: false,
});

let cookiePerm: boolean = true;
if (cookiePerm == true) {
	APP.use(SESSION_MIDDLEWARE);
}

import { DBSetup } from "./db/db";
DBSetup();

import sqlite3 from "better-sqlite3";
const DB = sqlite3("./db/db.db", { verbose: console.log });

import { indexRouter } from "./routes/index.route";
import { signupRouter} from "./routes/signup.route";
import { loginRouter } from "./routes/login.route";
import { createRouter } from "./routes/create.route";
import { redirectRouter } from "./routes/redirect.route";
import { searchRouter } from "./routes/search.route";
import { solveRouter } from "./routes/solve.route";
import { solutionRouter } from "./routes/solution.route";
// import { sessionRouter } from "./routes/session.route";
import { attemptRouter } from "./routes/attempt.route";
import { accountRouter } from "./routes/account.route";
import { logoutRouter } from "./routes/logout.route";
import { userRouter } from "./routes/user.route";
import { leaderboardRouter } from "./routes/leaderboard.route";
import { deleteRouter } from "./routes/delete.route";

const INDEX = indexRouter();
const ACCOUNT = accountRouter();
const ATTEMPT = attemptRouter(DB);
const CREATE = createRouter(DB);
const LEADERBOARD = leaderboardRouter(DB);
const LOGIN = loginRouter(DB);
const LOGOUT = logoutRouter();
const REDIRECT = redirectRouter(DB);
const SEARCH = searchRouter(DB);
// const session = sessionRouter();
const SIGNUP = signupRouter(DB);
const SOLVE = solveRouter(DB);
const SOLUTION = solutionRouter(DB);
const USER = userRouter(DB);
const DELETE = deleteRouter(DB);

APP.use("/", INDEX);
APP.use("/signup", SIGNUP);
APP.use("/login", LOGIN);
APP.use("/create", CREATE);
APP.use("/redirect/", REDIRECT);
APP.use("/search/", SEARCH);
APP.use("/solve", SOLVE);
APP.use("/solution", SOLUTION);
// APP.use("/session", SESSION);
APP.use("/attempt", ATTEMPT);
APP.use("/account", ACCOUNT);
APP.use("/logout", LOGOUT);
APP.use("/user", USER);
APP.use("/leaderboard", LEADERBOARD);
APP.use("/delete_problem", DELETE);

const PORT = 8000;
const URL = "http://localhost:" + PORT;
APP.listen(PORT, () => {
	try {
		console.log();
		console.log("Website running on: " + URL);
		console.log("Press { ctrl + c } to end the process...");
		console.log();
	} catch (err) {
		console.log(err);
	}
});
