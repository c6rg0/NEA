# How to run the project locally:

1. Open up the terminal:\
*On windows, do this with cmd.*

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
- First, make a new directory/folder:
*(on win and linux):*
`mkdir [path]`

- Change directory (enter the folder):\
*(on win and linux):*\
`cd [the same path]`

- Download the project from github using git:\
`$ git clone https://github.com/c6rg0/NEA.git`

4. Install the required npm packages:
- Check if the packages come with the project folder:\
`$ npm list`\
*If you don't see express and better-sqlite3:*\
`$ npm install express better-sqlite3`

5. Run the server:\
`$ node server.js`

If you go to http://localhost:8000, you can use/view the website.

Features to add:\
`A functional backend js quiz script` - nearly finished (waiting on the database)\
`Basic styling revamp` - half done\
`Quiz creation` - began coding it\
`SQL database` - planned the database structure\
`Server side api calling` - will code this once the previous steps are cleared
`Using a front end library - nowhere close, will do this at the end`

