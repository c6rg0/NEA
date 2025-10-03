const express = require('express');
const app = express();
const path = require('path');
const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'data',
	password: 'postgres',
	dialect: 'postgres',
	port: 5432
});

pool.connect((err, client, release) => {
	if (err) {
		return console.error(
			'Error aquiring client', err.stack)
	}
	client.query('SELECT NOW()', (err, result) => {
		release()
		if (err) {
			return console.error(
				'Error excecuting query', err.stack)
		}
		console.log("Connected to database!")
	})
})



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
	console.log("Server's started at http://localhost:8000");
})
