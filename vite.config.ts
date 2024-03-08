import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
// import fs from "fs";
// import path from "path";

// const versionPlugin = () => {
// 	return {
// 		name: "version-inject",
// 		config() {
// 			const version = fs
// 				.readFileSync(path.resolve(__dirname, "../version.txt"), "utf-8")
// 				.trim();
//
// 			return {
// 				define: {
// 					__VERSION__: JSON.stringify(version),
// 				},
// 			};
// 		},
// 	};
// };

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				// index: "index.html",
				// about: "about.html",
				main: "src/main.ts",
			},
			output: {
				// Configure the output file names
				entryFileNames: (chunkInfo) => {
					// Check if the chunk is 'paste.ts'
					if (chunkInfo.name === "main") {
						// Always compile to 'paste.js'
						return "assets/main.js";
					}
					// For all other entries, use the default naming scheme
					return "assets/[name]-[hash].js";
				},
				// assetFileNames: (assetInfo) => {
				// 	if (assetInfo.name === "paste.css") {
				// 		return "assets/paste.css";
				// 	}
				// 	return "assets/[name]-[hash][extname]";
				// },
			},
		},
	},
	// plugins: [svelte(), versionPlugin()],
	plugins: [svelte()],
});
