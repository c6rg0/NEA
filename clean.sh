#!/run/current-system/sw/bin/bash
# Cleans the project of node_modules/ and compiled files.

rm -vf server.js
rm -vf src/server.js
rm -rfv public/js
mkdir -pv public/js
rm -vf public/particles/particles_app.js
rm -rfv node_modules/
