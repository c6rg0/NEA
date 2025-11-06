"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
var Database = require("better-sqlite3");
var quiz_db = new Database('public/database/quiz.db', { verbose: console.log });
var account_db = new Database('public/database/account.db', { verbose: console.log });
quiz_db.pragma('journal_mode = WAL');
account_db.pragma('journal_mode = WAL');
app.use(express.static(path.join(__dirname, 'public')));
var PORT = 8000;
app.listen(PORT, function () {
    console.log("Server's started at http://localhost:8000");
});
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get("/browse", function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'browse.html'));
});
app.get("/create", function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'create.html'));
});
app.get("/create", function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'create.html'));
});
app.get("/play", function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'play.html'));
});
/*
app.get("/account", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'account.html'));
})

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
})


app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
})

app.get("/signup-success", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup-success.html'));
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
})
*/
quiz_db.exec("\n\tCREATE TABLE IF NOT EXISTS Meta(\n\t\tid INTEGER PRIMARY KEY AUTOINCREMENT,\n\t\tname TEXT,\n\t\tcreator TEXT\n\t);\n\n\tCREATE TABLE IF NOT EXISTS Settings(\n\t\tid INTEGER PRIMARY KEY AUTOINCREMENT,\n\t\tname TEXT UNIQUE,\n\t\tvalue TEXT\n\t);\n\n\tCREATE TABLE IF NOT EXISTS Questions(\n\t\tid INTEGER PRIMARY KEY AUTOINCREMENT,\n\t\tquestion_text TEXT,\n\t\tcategory TEXT\n\t);\n\n\tCREATE TABLE IF NOT EXISTS Options(\n\t\tid INTEGER PRIMARY KEY AUTOINCREMENT,\n\t\tquestion_id INTEGER,\n\t\toption_text TEXT,\n\t\tFOREIGN KEY (question_id) REFERENCES Questions(id)\n\t);\n\n\tCREATE TABLE IF NOT EXISTS Answers(\n\t\tid INTEGER PRIMARY KEY AUTOINCREMENT,\n\t\tquestion_id INTEGER,\n\t\toption_id INTEGER,\n\t\tFOREIGN KEY (question_id) REFERENCES Questions(id),\n\t\tFOREIGN KEY (option_id) REFERENCES Options(id)\n\t\t\n\t);\n");
account_db.exec("\n\tCREATE TABLE IF NOT EXISTS Logins(\n\t\tid INTEGER PRIMARY KEY AUTOINCREMENT,\n\t\t[username] TEXT UNIQUE,\n\t\t[password] TEXT\n\t);\n");
app.post('/submit-quiz-metadata', function (req, res) {
    var columns = quiz_db.prepare("PRAGMA table_info(Meta)").all();
    var temp = req.body;
    console.log(temp);
    if (!temp || !temp.name) {
        return res.status(400).json({ error: "Name is required" });
    }
    else {
        // SQL logic below:
        var insert = quiz_db.prepare('INSERT INTO Meta (name) VALUES(@name);');
        // Using (@name), the statement worked, 
        // the value is [null] though...
        insert.run({ name: temp.name });
        console.log("Data inserted successfully");
    }
});
