# Technologies used:
Languages: TypeScript, JavaScript\
Markdown: HTML5, CSS\
Package managers: pacman(system package manager), npm\
Server-side technolgy: NodeJS + express\
Database: SQLite3 (with the use of better-sqlite3)

# How to run the project locally:

1. Open up the terminal:\
*On windows, do this with cmd.*
- Every *$* symbol represents the start of a command.

2. Make sure that git and NodeJS are installed:\
*Git is a version control tool, and it will be used to*\
*download the latest version of the project*\
*(If you're interested in CS, knowing git is a requirement*\
*for doing anything practical).*

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
`mkdir [path]`\
Example:\
`mkdir /Code/NEA/` or `mkdir c:\Code\NEA\`

- Change directory (enter the folder):\
*(on win and linux):*\
`cd [the path you used before]`\
Now your in the folder!

- Download the project from github using git:\
`$ git clone https://github.com/c6rg0/NEA.git`

4. Install the required npm packages:
- Check if the packages come with the project folder:\
`$ npm list`\
*If you don't see anything (or get any errors when running later):*\
Submit the problem in the "issues" tab

5. Run utility.py:\
`$ py utility.py`\
- and enter option number 2,

6. Run the website!\
`$ node server.js`\
If you go to http://localhost:8000, you can use/view the website.\
- If an error occurs, run:\
`npm ci`, otherwise submit a ticket.

# Plan:
Fronend:
- `Write up all the markdown` - completed for now\
- `Use a frontend library` - low on my priority list 

Backend:
- `Create the quiz logic` - completed\
- `Quiz creation` - just began, I have a vague template of how to follow up\
- `Account management` - in its infant stages\
- `Cookies/session management` - don't remind me that I have to do this\
- `SQL database` - same status as quiz creation and account management\ 

Features I expect to have made by the end:\
- Basic quiz creation and playing\
- Boolean algebra lessons and calculator\
- Assembly language lessons and "assembler" (emulator)

