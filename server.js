const express = require('express');
const app = express();
const path = require('path');


try {
	const db = require('better-sqlite3')('database.db', options);
	const row = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
	console.log(row.firstName, row.lastName, row.email);
}
catch(err) {
	console.log('Database setup error!');
}

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get("/browse", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'browse.html'));
})

app.get("/play", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'play.html'));
})

app.get("/create", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'create.html'));
})

const PORT = 8000;
app.listen(PORT, () => {
	console.log("Servers started at http://localhost:8000");
})
