# Technologies used:
Languages: TypeScript, JavaScript, Python\
Markdown: HTML5, CSS\
Package managers: system wide package manager, npm\
Server-side technolgy: NodeJS + express\
Database: SQLite3 (with the use of better-sqlite3)

# Requirements:
- A UNIX (MacOS)or UNIX-like (linux) OS - If you're using windows you'll have to 
install wsl2: the Windows Subsystem for Linux so that the file paths and 
commands work.\
- NodeJS and git to be installed on the system

# If you have recieved this project through a zip file, read below:
The latest version of this project is uploaded onto github:
`https://github/c6rg0/NEA`.
To install the project, you'll still have to follow the below\
instructions, and using the zip file is harder compared to\
cloning the git repository if you're going to use wsl2.

# How to run the project locally:
*NOTE: "$" is used to represent terminal commands*\

1. Open up the terminal:\
If you're on linux or macos, and you have the terminal open,
you can go to step 2.\
*On windows, use up wsl2 (a command line open source virtual machine):*\

*To do so, open up cmd,*\
*enter `$ wsl`, let it download and reboot your machine once it's done.*\

*Once rebooted, go to cmd again, and enter `$ wsl --install ubuntu`,*\
*and follow the prompts.*\

*In wsl, type `$ sudo apt update` to upate the packages on the system,*\
*and then `$ sudo apt upgrade` to upgrade the packages - you now have a*\
*functional ubuntu linux vm.*

2. Make sure that git and NodeJS are installed:\
- On ubuntu (which is the distro we installed for wsl2):\
`$ sudo apt install git nodejs`.\
- On macos (using the homebrew package manager - `https://brew.sh/`)\
*NOTE: if you want to use homebrew, you'll have to install it with a command,*\
`$ brew instal node git`

3. Clone the project:
*NOTE: "~/" is used to represent the home directory, and "cd" to change directory.*\
`$ cd ~/`, *by defualt, wsl2 puts you in the windows filesystem*\ 
`$ git clone https://github.com/c6rg0/NEA.git && cd NEA/.`

4. Install the npm packages and dependencies:
`$ npm install`.\
- To make sure that the packages are up to date:\
`$ npm update`.

5. Run utility.py:\
*NOTE: utility.py is a quick script I made to compile, and clean up project:*\
`$ py utility.py`,\
and press the according option to compile the code.

6. Run the website!\
`$ node server.js`\
If you go to `http://localhost:8000` in the browser, you can use/view the website.\
*NOTE: To be clear, you can run the website in wsl, and use the browser in windows
to view the website*\
*If an error occurs relating to mismatched versions occur:*\
*Use `$ npm ci`.*

# Plan:
Fronend:
- `Write up all the markdown` - completed for now\
- `Use a frontend library` - low on my priority list 

Backend:
- `Create the quiz logic` - completed\
- `Quiz creation` - just began, I have a vague template of how to follow up\
- `Account management` - in its infant stages\
- `Cookies/session management` - don't remind me that I have to do this\
- `SQL database` - same status as quiz creation and account management

Features I expect to have made by the end:\
- Basic quiz creation and playing\
- Boolean algebra lessons and calculator\
- Assembly language lessons and "assembler" (emulator)

