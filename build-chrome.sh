#!/bin/bash

bun run build;
mkdir -p build/chrome;
cp dist/assets/main.js build/chrome;
cp chrome_manifest.json build/chrome/manifest.json;
cp -r icons build/chrome/;
