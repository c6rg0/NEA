//index.ts
import express from "express";
import path from "path";
import submitSignup from "./submit-signup";
import submitLogin from "./submit-login";
import submitQuizMetadata from "./submit-quiz-metadata";

const router = express.Router();

router.use("/submit-signup", submitSignup);
router.use("/submit-login", submitLogin);
router.use("/submit-quiz-metadata", submitQuizMetadata);

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname,"..", "views", "index.html"));
});

export default router;
