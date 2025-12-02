# Technologies used:
- Languages: `TypeScript` (compiled to `JavaScript`), `Bash` (in the terminal to manage\
  and use the project, as well as automating the removal of existing compiled code\
  unrelated to the functionality of the project),\
- Markdown: `HTML5` (`CSS` for styling),\
- Package managers: `Nix` (personally), `APT` and `Homebrew` (examples included in the\
  instructions), `npm` (nodejs package manager, in the instructions too),\
- Server-side technolgy: `NodeJS` + `express`,\
- Database: `SQLite3` (with the use of `better-sqlite3`),

> Any other things I forgot to mention are stated in package.json.

# Requirements:
- A `UNIX` (MacOS for example) OS or `Linux` distro - If you're using windows\
you'll have to install `wsl2`: the Windows Subsystem for Linux so that everything\
works (explanation below).

- NodeJS and git to be installed on the system (instructions are below).

- Explanation:\
I use NixOS on my laptop, a distrubution of linux. Linux being inspired by UNIX\
has forward slashes ( / ), however windows inconveniently uses back slashes ( \ ).\
File paths won't work and the server will simply crash.


# If you have recieved this project through a zip file, read below:
The latest version of this project is uploaded onto github:
`https://github/c6rg0/NEA`.\
To install the project, you'll have to follow the below instructions,but\
using the contents of the zip file is harder compared to cloning the git\
repository if you're going to use wsl2, added onto the fact that you'll be\
using outdated instructions which I fix pretty frequently.

# How to run the project locally:
*NOTE: "$" is used to represent terminal commands, don't include it in the terminal.*

1. Open up the terminal:\
If you're on linux or macos, and you have the terminal open,
you can go to step 2.\
*On windows, we'll set up wsl2 (a command line virtual machine):*

*To do so, open up cmd,*\
*enter `$ wsl`, let it download and reboot your machine once it's done.*

*Once rebooted, go to cmd again, and enter `$ wsl --install ubuntu`,*\
*and follow the prompts.* 

*In wsl, type `$ sudo apt update` to upate the packages on the system,*\
*and then `$ sudo apt upgrade` to upgrade the packages - you now have a*\
*functional ubuntu linux vm.*

2. Make sure that git and NodeJS are installed:
- On ubuntu (which is the distro we installed for wsl2):\
*NOTE: Any other distro works, I'm just using ubuntu for the examples*\
`$ sudo apt install git nodejs npm node-typescript`
- On macos (using the homebrew package manager - `https://www.brew.sh`)\
*NOTE: if you want to use homebrew, you'll have to install it beforehand,*\
`$ brew install git node typescript`

3. Clone the project:\
*NOTE: "~/" is used to represent the home directory, and "cd" to change directory.*\
`$ cd ~/ && git clone https://github.com/c6rg0/NEA.git && cd NEA/`

4. Install the npm packages and dependencies:\
*NOTE: You're now in the project directory*\
`$ npm install`
*You can update packages with `npm update`, but it's likely to cause errors.*

5. Compile the source code:\
`$ node script build`

6. Run the website!\
`$ node script start`\
If you go to `http://localhost:8000` in the browser, you can use and test the website.\
*NOTE: To be clear, you can run the website in wsl, and use the browser in windows
to view the website.*\

> If an error occurs relating to `mismatched versions`:
> Use `$ npm ci`,
> it does a clean install, and disregards existsing node modules in the project.

# Plan:
Frontend:
- `Write up all the markdown` - completed until further notice
- `Use a frontend library` - will do this once everything else is done

Backend:
- `Create the quiz logic` - completed as a template for later
- `sql database management` - at it's best
- `Cookies/session management` - my priority now
- `Quiz creation` - just dipped my toes into it

Features I expect to have made by the end:
- Basic quiz creation and playing
- Boolean algebra lessons and calculator
- Assembly language lessons and "assembler"(emulator)

(star 1) Database passwords need to be encrypted with SHA256 to make it sight unreadable, info such as "this username\
"already exists" or "enter a password" etc need to be displayed in the browser (atm, it's just displayed on the server side).\
The website is http so traffic is unencrypted (for a project, it's not a big deal).

