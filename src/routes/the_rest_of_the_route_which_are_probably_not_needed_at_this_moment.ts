import express = require('express');
let router = express.Router();
import path = require('path');

router
.get("/account", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'account.html'));
})

.get("/signup", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'signup.html'));
})


.get("/signup", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'signup.html'));
})

.get("/signup-success", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'signup-success.html'));
})

.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'login.html'));
})

