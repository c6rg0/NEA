#!/usr/bin/env bash
# Removes compiled js code

rm -rfv node_modules/
rm -v server.js
rm -rfv routes/*
rm -rfv public/js/*
rm -vf public/particles/*.js
