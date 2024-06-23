<script lang="ts">
import { match } from "ts-pattern";
import { decryptMessage } from "./helpers";

// @ts-ignore
const usfw = unsafeWindow;

async function onkey(e: { key: string }) {
	// If the key is enter, submit.
	if (e.key === "Enter") {
		await submit();
	}
}

async function submit() {
	// Get the input contents.
	const contents = (document.getElementById("import-url") as HTMLInputElement)
		.value;
	if (contents === "") {
		alert("You must enter some text to import.");
		return;
	}

	const url = importableUrl(contents);
	if (url === "") {
		alert("Not a valid PokeBin URL");
		return;
	}

	const password = (
		document.getElementById("password-import") as HTMLInputElement
	).value;

	const response = await fetch(url);
	const response_data = await response.json();

	// If there is encrypted_data field, alert that we need a password.
	if (response_data.encrypted_data && password === "") {
		alert("You need to enter a password to import.");
		return;
	}
	if (response_data.encrypted_data && password !== "") {
		const decrypted = await decryptMessage(
			password as string,
			response_data.encrypted_data,
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
		const content = data.split("\n-----\n");
		const metadata = JSON.parse(content[0]);
		data = content[1];
		response_data.title = metadata.title;
		response_data.paste = data;
		response_data.notes = `${metadata.format}\n${metadata.notes}`;
	}

	const notes = response_data.notes.split("\n");
	if (notes[0].startsWith("Format: ")) {
		const formatid = usfw.toID(notes[0].slice(8));
		const format = usfw.BattleFormats[formatid];
		if (format) usfw.room.changeFormat(format.id);
		notes.shift();
	}
	let title = response_data.title;
	if (title && !title.startsWith("Untitled")) {
		title = title.replace(/[\|\\\/]/g, "");
		usfw.$(".teamnameedit").val(title).change();
	}
	usfw.Storage.activeSetList = usfw.room.curSetList = usfw.Storage.importTeam(
		response_data.paste,
	);
	usfw.room.updateTeamView();
}

function importableUrl(value: string): string {
	const match = value.match(/^https?:\/\/(pokebin\.com)\/(.*)\s*$/);
	if (!match) return "";
	const path = match[2];
	return `https://pokebin.com/${path.replace(/\/.*/, "")}/json`;
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
