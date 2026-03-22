import express from "express";
const app = express();
app.set("view engine", "ejs");

import bodyParser from "body-parser";
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

import path from "path";
app.use(express.static(path.join(__dirname, "public")));

import session from "express-session";
declare module "express-session" {
	interface SessionData {
		user: { username: string};
	}
}

const sessionMiddleware = session({
	// date +%s%N | sha512sum
	secret: "7f8b901b7b70580f29b1e64296c3ba20e0dc17a29bf50b9eba302e3688cb12b1f666569ae6b412a43d63af9ffa5400833fdac5e1c30abdd8e1a94c06a665dd6b",
	resave: false,
	saveUninitialized: false,
});

let cookiePerm: boolean = true;
if (cookiePerm == true) {
	app.use(sessionMiddleware);
}

import { dbSetup } from "./db/db";
dbSetup();

import sqlite3 from "better-sqlite3";
const db = sqlite3("./db/db.db", { verbose: console.log });

import { indexRouter } from "./routes/index.route";
import { signupRouter} from "./routes/signup.route";
import { loginRouter } from "./routes/login.route";
import { createRouter } from "./routes/create.route";
import { redirectRouter } from "./routes/redirect.route";
import { searchRouter } from "./routes/search.route";
import { browseRouter } from "./routes/browse.route";
import { solveRouter } from "./routes/solve.route";
import { solutionRouter } from "./routes/solution.route";
// import { sessionRouter } from "./routes/session.route";
import { attemptRouter } from "./routes/attempt.route";
import { accountRouter } from "./routes/account.route";
import { logoutRouter } from "./routes/logout.route";
import { userRouter } from "./routes/user.route";
import { leaderboardRouter } from "./routes/leaderboard.route";

const index = indexRouter();
const account = accountRouter();
const attempt = attemptRouter(db);
const browse = browseRouter(db);
const create = createRouter(db);
const leaderboard = leaderboardRouter(db);
const login = loginRouter(db);
const logout = logoutRouter();
const redirect = redirectRouter(db);
const search = searchRouter(db);
// const session = sessionRouter();
const signup = signupRouter(db);
const solve = solveRouter(db);
const solution = solutionRouter(db);
const user = userRouter(db);

app.use("/", index);
app.use("/signup", signup);
app.use("/login", login);
app.use("/create", create);
app.use("/redirect/", redirect);
app.use("/search/", search);
app.use("/browse", browse);
app.use("/solve", solve);
app.use("/solution", solution);
// app.use("/session", session);
app.use("/attempt", attempt);
app.use("/account", account);
app.use("/logout", logout);
app.use("/user", user);
app.use("/leaderboard", leaderboard);

const port = 8000;
const url = "http://localhost:" + port;
app.listen(port, () => {
	try {
		console.log();
		console.log("Website running on: " + url);
		console.log("Press { ctrl + c } to end the process...");
		console.log();
	} catch (err) {
		console.log(err);
	}
});
