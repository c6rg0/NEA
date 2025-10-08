const express = require('express');
const app = express();
const path = require('path');
const Pool = require('pg').Pool;
// const cors = require('cors');

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

//app.use(cors());
//app.use(bodyParser.json());

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

app.get("/account", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'account.html'));
})

app.get("/signup", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'signup.html'));
})


app.get("/signup", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'signup.html'));
})

app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'login.html'));
})


// Example route to handle POST request,
// The POST request is in:
// $ views/create.html
// $ public/js/creation.js
// app.post('/submit-quiz-metadata', (req, res) => {
	// The code underneath this comment neads to be fixed
	// for now, it's dummy code.
//	const userData = req.body;
//	console.log('Recieve data from client:', userdata);

	// Database (sql) logic comes here	

//	res.json({ message: 'Data recieved', data: userData });
// });

const PORT = 8000;
app.listen(PORT, () => {
	console.log("Server's started at http://localhost:8000");
})
