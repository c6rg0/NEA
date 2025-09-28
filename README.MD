# How to run the website locally:

1. Make sure that node.js and npm are installed:\
-If you use arch linux:\
*(If you use any other distro, replace "pacman -S" with your\
specific package manager installation command)*\
`$ sudo pacman -S nodejs`\
`$ sudo pacman -S npm`\
-If you use windows 11:*\
*(in cmd)*\
`$ winget install -e --id OpenJS.NodeJS`\
*(winget is preinstalled on every win11 machine)*

2. Install the required packages with npm:\
`$ npm install express better-sqlite3`

3. Run http-server:\
`$ node server.js`

And vioala, it works (no need to thank me pal)

Features to add:\
`A functional backend js quiz script` - nearly finished (waiting on the database)\
`Basic styling revamp` - half done\
`Quiz creation` - began coding it\
`SQL database` - planned the database structure\
`Server side api calling` - will code this once the previous steps are cleared
`Using a front end library - nowhere close, will do this at the end`

