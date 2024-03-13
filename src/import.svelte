<script lang="ts">
	import { match } from "ts-pattern";
	import { decryptMessage } from "./helpers";

	// @ts-ignore
	let usfw = unsafeWindow;

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

		let url = importableUrl(contents);
		if (url === "") {
			alert("Not a valid PokeBin URL");
			return;
		}

		let password = (
			document.getElementById("password-import")! as HTMLInputElement
		).value;

		let response = await fetch(url);
		let response_data = await response.json();

		// If there is encrypted_data field, alert that we need a password.
		if (response_data.encrypted_data && password === "") {
			alert("You need to enter a password to import.");
			return;
		} else if (response_data.encrypted_data && password !== "") {
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
			response_data.title = metadata.title;
			response_data.paste = data;
			response_data.notes = metadata.format + "\n" + metadata.notes;
		}

		let notes = response_data.notes.split("\n");
		if (notes[0].startsWith("Format: ")) {
			let formatid = usfw.toID(notes[0].slice(8));
			let format = usfw.BattleFormats && usfw.BattleFormats[formatid];
			if (format) usfw.room.changeFormat(format.id);
			notes.shift();
		}
		let title = response_data.title;
		if (title && !title.startsWith("Untitled")) {
			title = title.replace(/[\|\\\/]/g, "");
			usfw.$(".teamnameedit").val(title).change();
		}
		usfw.Storage.activeSetList = usfw.room.curSetList =
			usfw.Storage.importTeam(response_data.paste);
		usfw.room.updateTeamView();
	}

	function importableUrl(value: string): string {
		var match = value.match(/^https?:\/\/(pokebin\.com)\/(.*)\s*$/);
		if (!match) return "";
		var path = match[2];
		return "https://pokebin.com/" + path.replace(/\/.*/, "") + "/json";
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
