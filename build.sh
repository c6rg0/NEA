#!/run/current-system/sw/bin/bash
# Builds all the source files in the repo

npm install 

tsc 
tsc -p tsconfig.json

tsc 
tsc -p tsconfig.backend.json

tsc
tsc -p tsconfig.frontend.json

