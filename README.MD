# How to run the website locally:

1. Open up the terminal:
On windows, do this with cmd.

2. Make sure that node.js and npm are installed:\
- If you use arch linux:\
*(or any other linux distro, replace "pacman -S" with your\
specific package manager installation command)*\
`$ sudo pacman -S nodejs`\
`$ sudo pacman -S npm`\
*(Note: npm might come with downloading just node.js)*
- If you use windows 11:\
`$ winget install -e --id OpenJS.NodeJS`\
*(winget is preinstalled on every win11 machine)*

2. Install the required npm packages:\
`$ npm install express better-sqlite3`

3. Run server.js:\
`$ node server.js`

And vioala, it works (no need to thank me pal)

Features to add:\
`A functional backend js quiz script` - nearly finished (waiting on the database)\
`Basic styling revamp` - half done\
`Quiz creation` - began coding it\
`SQL database` - planned the database structure\
`Server side api calling` - will code this once the previous steps are cleared
`Using a front end library - nowhere close, will do this at the end`

