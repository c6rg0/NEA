const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
	db.run("CREATE TABLE lorem (info TEXT)");

	const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
	for (let i = 0; i < 10; i++) {
		stmt.run("Ipsum " + i);
	}
	stmt.finalize();

	db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(row.id + ": " + row.info);
	});
});

db.close();

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
	console.log("Servers started");
})
