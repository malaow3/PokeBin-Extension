# PokeBin-Extension

## What is this?
This is a helper tool for importing & exporting your teams to PokeBin while we wait for official Showdown integration!

## How to Install
1. Install Tampermonkey for either [Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
2. Once Tampermonkey is installed, navigate to this link to install the script: 

## Why not a proper web-extension?
There are a couple of reasons why I opted for a userscript approach:
- Making a web extension that is compatible with both Chrome AND Firefox is difficult.
- My knowledge of JavaScript is limited.
- I did not want to maintain something that will hopefully just be built in to Showdown.

## Building from source
To build from source, you can follow the guide below. Please first have [Bun](https://bun.sh/) installed.

1. Clone the repo
2. Run `bun install`
3. Run `bun run build`
4. Copy the contents of `build/main.user.js` to Tampermonkey
