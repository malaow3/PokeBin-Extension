#!/bin/bash


bun run build;
mkdir -p build/firefox;
cp dist/assets/main.js build/firefox;
cp ff_manifest.json build/firefox/manifest.json;
cp -r icons build/firefox/;
