//index.ts
import express from "express";
import path from "path";
import submitSignup from "./submit-signup";
import submitLogin from "./submit-login";

const router = express.Router();

router.use("/submit-signup", submitSignup);
router.use("/submit-login", submitLogin);

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname,"..", "views", "index.html"));
});

export default router;
