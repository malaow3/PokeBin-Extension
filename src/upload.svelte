<script lang="ts">
	import { encryptMessage } from "./helpers";

	// @ts-ignore
	let usfw = unsafeWindow;

	async function onkey(e: { key: any }) {
		// If the key is enter, submit.
		if (e.key === "Enter") {
			await process_button();
		}
	}

	async function process_button(
		e:
			| (SubmitEvent & { currentTarget: EventTarget & HTMLFormElement })
			| null = null,
	) {
		let ots_element = document.getElementById("ots")! as HTMLInputElement;
		let ots = ots_element.checked;
		if (e) {
			e.preventDefault();
		}
		console.info(usfw.room);
		console.info(usfw.room.curTeam);
		if (usfw.room.curTeam.team.length === 0) {
			alert("No team selected.");
			return;
		}

		let name = usfw.room.curTeam.name;
		let format = usfw.room.curTeam.format;
		let gen = usfw.room.curTeam.gen;
		let team = usfw.Storage.exportTeam(usfw.room.curTeam.team, gen, ots);
		let author = usfw.app.user.attributes.name;

		let password_element = document.getElementById(
			"password",
		)! as HTMLInputElement;
		let password = password_element.value as string;
		let form = document.getElementById("PokeBinForm")! as HTMLFormElement;

		if (password !== "") {
			let content = team.replaceAll("\\n", "\n");

			let jsondata = {
				title: name,
				author: author,
				notes: "",
				format: format,
				rental: "",
			};
			content = JSON.stringify(jsondata) + "\n-----\n" + content;
			// AES encrypt the paste
			let data = await encryptMessage(password, content);
			// Submit the form removing the password

			let hidden_input = document.getElementById(
				"encrypted_data",
			)! as HTMLInputElement;
			hidden_input.value = data;
			form.submit();
		} else {
			let title_element = document.getElementById(
				"title",
			)! as HTMLInputElement;
			let format_element = document.getElementById(
				"format",
			)! as HTMLInputElement;
			let author_element = document.getElementById(
				"author",
			)! as HTMLInputElement;
			let paste_element = document.getElementById(
				"paste",
			)! as HTMLTextAreaElement;
			title_element.value = name;
			format_element.value = format;
			author_element.value = author;
			paste_element.value = team.replaceAll("\\n", "\n");

			form.submit();
		}
	}
</script>

<main>
	<br />
	<div class="group">
		<form
			id="PokeBinForm"
			method="post"
			action="https://pokebin.com/create"
			target="_blank"
			class="form-row"
			on:submit={(e) => {
				return process_button(e);
			}}
		>
			<button class="button" type="submit">Upload to PokeBin</button>
			<label for="ots">
				<input type="checkbox" id="ots" />
				OTS
			</label>
			<input
				on:keydown={onkey}
				class="custom-input"
				type="password"
				id="password"
				placeholder="Enter a password"
			/>
			<input name="title" id="title" hidden />
			<input name="format" id="format" hidden />
			<input name="author" id="author" hidden />
			<textarea name="paste" id="paste" hidden />
			<input name="notes" value="" hidden />
			<input name="rental" value="" hidden />
			<input name="encrypted_data" id="encrypted_data" value="" hidden />
		</form>
	</div>
	<style>
		.group {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.form-row {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.form-row > * {
			margin-right: 10px;
		}

		.custom-input {
			border-radius: 5px;
		}
	</style>
</main>
