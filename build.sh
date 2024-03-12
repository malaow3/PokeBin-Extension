#!/bin/bash

bun run build:internal;
mkdir -p build;
cp dist/assets/main.js build/pokebin-ext.user.js;

cp -r icons build;

# Prepend userscript metadata to the file.
{
	echo "// ==UserScript=="
	echo "// @name			Pokebin Extension"
	echo "// @version		1.0.0"
	echo "// @description	Import and Export teams to & from PokeBin!"
	echo "// @author		malaow3"
	echo "// @match			https://play.pokemonshowdown.com/*"
	echo "// @icon			data:image/png;base64,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"
    echo "// ==/UserScript=="
	echo ""
	cat build/pokebin-ext.user.js
} > build/tmp-pokebin-ext.user.js

mv build/tmp-pokebin-ext.user.js build/pokebin-ext.user.js