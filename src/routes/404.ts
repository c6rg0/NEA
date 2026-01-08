//404.ts
import express from "express";
import path from "path";

const router = express.Router();

router.get("/", async (req, res) => {
	res.status(404).send("404 - Page not found");
	console.log("404 - Page not found");
});

export default router;

