# Leetregex - Website for learning and improving regex skills

## Technologies used:
- Languages: `TypeScript` (compiled to `JavaScript`), `Bash` (in the terminal to manage
  the compilation of the project, as well as to automate the removal of existing compiled 
  code unrelated to the functionality),
- Markdown: `HTML5` (`CSS` for styling),
- Package managers: `Nix` (personally), `APT` and `Homebrew` (examples included in the
  instructions), `npm` (nodejs package manager, in the instructions too),
- JavaScript runtime: `NodeJS`
- NPM packages: `express`, `express-session`, `better-sqlite3`, `bcrypt`

> Any other things I forgot to mention are stated in package.json.

## Requirements:
- A `UNIX` (MacOS for example) OS or `Linux` distro - If you're using windows\
you'll have to install `wsl2`: the Windows Subsystem for Linux so that everything\
works (explanation below).

- NodeJS and git to be installed on the system (instructions are below).

- Explanation:\
I use NixOS on my laptop, a distrubution of linux. Linux being inspired by UNIX\
has forward slashes ( / ), however windows inconveniently uses back slashes ( \ ).\
File paths won't work and the server will simply crash.

## How to run the project locally:
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

5. Compile the source code:\
*NOTE: Chmod is used to set file permisions*
`$ sudo chmod +x build.sh`
`$ ./build`

6. Run the website!\
`$ node script start`\
If you go to `http://localhost:8000` in the browser, you can use and test the website.\
*NOTE: To be clear, you can run the website in wsl, and use the browser in windows
to view the website.*\

> If an error occurs relating to `mismatched versions`:
> Use `$ npm ci`,
> it does a clean install, and disregards existsing node modules in the project.

## To do list:
- [x] Redesign the database (until further notice)
- [x] Make a broswing system
- [x] Make a problem creation system
- [ ] Make a problem searching system
- [ ] Make solving problems possible (quiz.ts -> solve.ts)

- [ ] Use fetch api to fill in any gaps
- [ ] Make an algorithm to determine regex problem difficulty
- [ ] Make an elo/pp system to determine user skill
- [ ] Add leaderboards and other front end features
- [ ] Finish off the styling


