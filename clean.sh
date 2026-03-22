#!/usr/bin/env bash
# Removes compiled js code

rm -rfv node_modules/

rm -rfv dist/*.js
rm -rfv dist/db/*js
rm -rfv dist/routes/*.js
rm -rfv dist/public/js/*.js
