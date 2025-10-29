import express, { Router } from "express";
import path = require('path');

const router: Router = express.Router();
router.get("/play", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'play.html'));
})
