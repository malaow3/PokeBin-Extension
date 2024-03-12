#!/bin/bash

bun run buildc;
mkdir -p build/chrome;
cp dist/assets/main.js build/chrome;
cp dist/assets/background.js build/chrome;
cp chrome_manifest.json build/chrome/manifest.json;
cp -r icons build/chrome/;
