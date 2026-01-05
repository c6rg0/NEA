#!/run/current-system/sw/bin/bash
# Cleans the project of node_modules/ and compiled files.

rm -rvf *.js
rm -rvf *.js.map
rm -rvf *.d.ts
rm -rvf *.d.ts.map

rm -vf src/*.js
rm -vf src/*.js.map
rm -vf src/*.d.ts
rm -vf src/*.d.ts.map

rm -rfv public/js/*

rm -rfv routes/*

rm -vf public/particles/*.js

rm -rfv node_modules/
