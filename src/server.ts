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

app.use((req, res, next) => {
	console.log("User: " + req.session.user);
	next();
});

import { dbSetup } from "./db/db";
dbSetup();

import router from "./routes/index";
app.use("/", router);

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
