#!/usr/bin/env bash
# Builds all the source files in the repo

npm install 

tsc 
tsc -p tsconfig.json

tsc 
tsc -p tsconfig.public.json

cd dist/
node server.js
cd ..
