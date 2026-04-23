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
	// (with coreutils, in the terminal):
	// $ date | sha256sum
	secret: "41db0fe8c13891866f2f92ecda4e587e000391aa8b9de40952808a3e19f796c6",
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
import { attemptRouter } from "./routes/submit_attempt.route";
import { accountRouter } from "./routes/account.route";
import { logoutRouter } from "./routes/logout.route";
import { userRouter } from "./routes/user.route";
import { leaderboardRouter } from "./routes/leaderboard.route";
import { deleteRouter } from "./routes/delete.route";
import { elseRouter } from "./routes/exception.route";

const INDEX = indexRouter();
const ACCOUNT = accountRouter();
const ATTEMPT = attemptRouter(DB);
const CREATE = createRouter(DB);
const LEADERBOARD = leaderboardRouter(DB);
const LOGIN = loginRouter(DB);
const LOGOUT = logoutRouter();
const REDIRECT = redirectRouter(DB);
const SEARCH = searchRouter(DB);
const SIGNUP = signupRouter(DB);
const SOLVE = solveRouter(DB);
const SOLUTION = solutionRouter(DB);
const USER = userRouter(DB);
const DELETE = deleteRouter(DB);
const ELSE = elseRouter();

APP.use("/", INDEX);
APP.use("/signup/", SIGNUP);
APP.use("/login/", LOGIN);
APP.use("/create/", CREATE);
APP.use("/redirect/", REDIRECT);
APP.use("/search/", SEARCH);
APP.use("/solve/", SOLVE);
APP.use("/solution/", SOLUTION);
APP.use("/submit_attempt/", ATTEMPT);
APP.use("/account/", ACCOUNT);
APP.use("/logout/", LOGOUT);
APP.use("/user/", USER);
APP.use("/leaderboard/", LEADERBOARD);
APP.use("/delete_problem/", DELETE);
APP.use(ELSE);

const PORT = 8000;
const URL = "http://localhost:" + PORT;
try{
	APP.listen(PORT, () => {
		console.log("Website running on: " + URL);
		console.log("(Press [Ctrl + c] to end the process) \n");
	});
} catch (error){
	console.log("Critical networking error: \n");
	console.log(error + "\n");
	console.log("Exiting process.");
	process.exit(1); 
}
