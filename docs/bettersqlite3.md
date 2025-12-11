# Bettersqlite3 manual

## Import
`import Database from 'better-sqlite3';`

## Defigning a database
`const db = new Database('location/location', { verbose: console.log });`

`db.pragrma('journal_mode = WAL');`
(this increases performance)

## Creating a table
`db.exec(`
	CREATE TABLE IF NOT EXISTS table1(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		[username] TEXT UNIQUE,
		[password] TEXT
	);
`)`

## IDK what this does
`db.prepare("PRAGMA table_info(table1)").all()`

## Inserting data
`const insert = db.prepare('INSERT INTO table1 (username) 
 VALUES(@username);');`

`insert.run({ username: local-variable.username });`
(local-variable is usually a json variable from a request)

(or)

`const insert = account_db.prepare(`
	 INSERT INTO table1 (username, password) VALUES
			 (@username , @password);`);
 insert.run({ username: local-variable.username, password: 
 local-variable.password });`


## Selecting data - finding if a user exists
`const find-user = db.prepare('SELECT username FROM table1 
 WHERE username = ?').get(local-variable.username);`
(find-user should be `True`)


