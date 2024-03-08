<script lang="ts">
	import { match } from "ts-pattern";
	import { decryptMessage } from "./helpers";

	async function onkey(e: { key: any }) {
		// If the key is enter, submit.
		if (e.key === "Enter") {
			await submit();
		}
	}

	async function submit() {
		// Get the input contents.
		let contents = (
			document.getElementById("import-url")! as HTMLInputElement
		).value;
		if (contents === "") {
			alert("You must enter some text to import.");
			return;
		}

		let value = importableUrl(contents);
		if (value === "") {
			alert("Not a valid PokeBin URL");
			return;
		}

		let password = (
			document.getElementById("password-import")! as HTMLInputElement
		).value;

		window.addEventListener("message", async function handler(event) {
			if (event.source === window) {
				try {
					const response_data = JSON.parse(event.data);
					if (response_data.type === "importTeamMsg") {
						console.info("Imported team");
					} else if (
						response_data.type == "importTeamMsg-decrypted"
					) {
						let decrypted = await decryptMessage(
							password as string,
							response_data.data,
						);
						let data = "";
						match(decrypted)
							.with({ type: "error" }, async () => {
								alert("Incorrect password.");
								return;
							})
							.with({ type: "ok" }, ({ unwrap }) => {
								data = unwrap();
							});
						let content = data.split("\n-----\n");
						let metadata = JSON.parse(content[0]);
						data = content[1];
						let raw_title = metadata.title;
						let raw_format = metadata.format;
						injectScript2(
							raw_title,
							raw_format,
							data.replaceAll("\n", "\\n"),
						);
					}
				} catch (e) {
					console.error(e);
				}
			}
		});
		injectScript(value, password);
	}

	function importableUrl(value: string): string {
		var match = value.match(/^https?:\/\/(pokebin\.com)\/(.*)\s*$/);
		if (!match) return "";
		var path = match[2];
		return "https://pokebin.com/" + path.replace(/\/.*/, "") + "/json";
	}

	async function handler(url: string, password: string) {
		let response = await fetch(url);
		let response_data = await response.json();

		// If there is encrypted_data field, alert that we need a password.
		if (response_data.encrypted_data && password === "") {
			alert("You need to enter a password to import.");
			return;
		} else if (response_data.encrypted_data && password !== "") {
			window.postMessage(
				JSON.stringify({
					type: "importTeamMsg-decrypted",
					data: response_data.encrypted_data,
				}),
				"*",
			);
		} else if (!response_data.encrypted_data) {
			let notes = response_data.notes.split("\n");
			if (notes[0].startsWith("Format: ")) {
				// @ts-ignore
				let formatid = toID(notes[0].slice(8));
				let format =
					// @ts-ignore
					window.BattleFormats && window.BattleFormats[formatid];
				// @ts-ignore
				if (format) self.room.changeFormat(format.id);
				notes.shift();
			}
			let title = response_data.title;
			if (title && !title.startsWith("Untitled")) {
				title = title.replace(/[\|\\\/]/g, "");
				// @ts-ignore
				self.$(".teamnameedit").val(title).change();
			}
			// @ts-ignore
			window.Storage.activeSetList = window.room.curSetList =
				// @ts-ignore
				window.Storage.importTeam(response_data.paste);
			// @ts-ignore
			window.room.updateTeamView();

			window.postMessage(
				JSON.stringify({ type: "importTeamMsg", data: response_data }),
				"*",
			);
		}
	}

	async function handler2(
		raw_title: string,
		raw_format: string,
		data: string,
	) {
		// @ts-ignore
		let formatid = toID(raw_format);
		let format =
			// @ts-ignore
			window.BattleFormats && window.BattleFormats[formatid];
		// @ts-ignore
		if (format) self.room.changeFormat(format.id);
		let title = raw_title;
		if (title && !title.startsWith("Untitled")) {
			title = title.replace(/[\|\\\/]/g, "");
			// @ts-ignore
			self.$(".teamnameedit").val(title).change();
		}
		// @ts-ignore
		window.Storage.activeSetList = window.room.curSetList =
			// @ts-ignore
			window.Storage.importTeam(data);
		// @ts-ignore
		window.room.updateTeamView();

		window.postMessage(
			JSON.stringify({ type: "importTeamMsg", data: data }),
			"*",
		);
	}

	function injectScript(url: string, password: string = "") {
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.id = "messenger";
		let content = handler.toString();
		script.textContent = `
			(${content})("${url}", "${password}");
		`;
		(document.head || document.documentElement).appendChild(script);

		// Remove the script.
		script.remove();
	}

	function injectScript2(
		raw_title: string,
		raw_format: string,
		data: string,
	) {
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.id = "messenger";
		let content = handler2.toString();
		script.textContent = `
			(${content})("${raw_title}", "${raw_format}", "${data.replaceAll(
				/\\\\n/g,
				"\\n",
			)}");
		`;
		(document.head || document.documentElement).appendChild(script);

		// Remove the script.
		script.remove();
	}
</script>

<main>
	<input
		on:keydown={onkey}
		id="import-url"
		class="custom-input custom-input-import"
		type="url"
		placeholder="Enter PokeBin URL"
	/>
	<input
		on:keydown={onkey}
		class="custom-input custom-password"
		type="password"
		id="password-import"
		placeholder="Enter a password"
	/>
	<button class="button" on:click={submit}> Import from PokeBin </button>

	<style>
		.custom-input-import {
			width: 250px;
		}
	</style>
</main>
