# Technologies used:
Languages: TypeScript, JavaScript
Markdown: HTML5, CSS\
Package managers: pacman(system package manager), npm\
Server-side technolgy: NodeJS + express\
Database: SQLite3 (with the use of better-sqlite3)

# How to run the project locally:

1. Open up the terminal:\
*On windows, do this with cmd.*
- Every *$* symbol represents the start of a command.

2. Make sure that git, node.js and npm are installed:
- If you use arch linux:\
*(on any other linux distro, replace "pacman -S"\
with your specific package manager installation command)*\
`$ sudo pacman -S git nodejs`

- If you use windows 11:\
`$ winget install -e --id Git.Git`\
`$ winget install -e --id OpenJS.NodeJS`\
*(winget is preinstalled on every win11 machine)*

3. Download the project:
- First, make a new directory/folder:\
*(on win and linux):*\
`mkdir [path]`
Example:
`mkdir /Code/NEA/` or `mkdir c:\Code\NEA\`

- Change directory (enter the folder):\
*(on win and linux):*\
`cd [the path you used before]`
Now your in the folder!

- Download the project from github using git:\
`$ git clone https://github.com/c6rg0/NEA.git`

4. Install the required npm packages:
- Check if the packages come with the project folder:\
`$ npm list`\
*If you don't see anything (or get any errors when running later):*\
`$ npm install express pg pg-hstore body-parser`

5. Run the server:\
`$ node server.js`

If you go to http://localhost:8000, you can use/view the website.

# Plan:\
`A functional backend js quiz script` - nearly finished (waiting on the database)\
`Basic styling revamp` - half done\
`Quiz creation` - began coding it\
`SQL database` - planned the database structure\
`Server side api calling` - will code this once the previous steps are cleared
`Using a front end library - nowhere close, will do this at the end`

