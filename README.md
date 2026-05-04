# AQA A-Level CS NEA
# Regex practice site

## Technologies used:
> Languages: `TypeScript` (transpiled to `JavaScript`), `Bash` (for the build/clean scripts),\
> JavaScript runtime: `NodeJS`,\
> Package managers: `NPM`,\
> Framework: `express`\
> Frontend: `EJS (embedded JavaScript`, `BootstrapJS`, `CSS`,

- (Anything not included here is in `package.json`)

# How to run the project locally:
*NOTE: "$" is used to represent terminal commands, don't include it in the terminal.*

- Ensure that you're using a unix(-like) OS, like Linux or macos.
- On windows, I recommend installing wsl2 with ubuntu and following the bellow instructions.

1. Install git, nodejs, npm, typescript using your package manager\
- On Ubuntu:\
`$ sudo apt install git nodejs npm node-typescript`\
- On macos (with homebrew):\
`$ brew install git node typescript`

2. Clone the repo:\
`$ git clone https://github.com/c6rg0/nea && cd nea`

3. Compile:\
`$ sudo chmod +x build.sh`
`$ ./build.sh`

4. Run:\
`$ npm run website`
- You can access it [here](http://localhost:8000).
