<script lang="ts">
	import { encryptMessage } from "./helpers";

	async function onkey(e: { key: any }) {
		// If the key is enter, submit.
		if (e.key === "Enter") {
			await process_button();
		}
	}
	type PokeBinCurTeamData = {
		name: string;
		format: string;
		gen: string;
		team: string;
		author: string;
	};
	// function injectScript(ots: boolean) {
	// 	const script = document.createElement("script");
	// 	script.type = "text/javascript";
	// 	script.id = "messenger";
	// 	if (ots) {
	// 		script.textContent = `
	// 		(function() {
	// 			window.PokeBinCurTeamData = {
	// 				"name": window.room.curTeam.name,
	// 				"format": window.room.curTeam.format,
	// 				"gen": window.room.curTeam.gen,
	// 				"team": window.Storage.exportTeam(window.room.curTeam.team, window.room.curTeam.gen, true),
	// 				"author": window.app.user.attributes.name
	// 			};
	// 			window.postMessage(JSON.stringify({ type: 'customTeamMsg', curTeam: window.PokeBinCurTeamData }), '*');
	// 		})();
	// 		`;
	// 	} else {
	// 		script.textContent = `
	// 		(function() {
	// 			window.PokeBinCurTeamData = {
	// 				"name": window.room.curTeam.name,
	// 				"format": window.room.curTeam.format,
	// 				"gen": window.room.curTeam.gen,
	// 				"team": window.Storage.exportTeam(window.room.curTeam.team, window.room.curTeam.gen, false),
	// 				"author": window.app.user.attributes.name
	// 			};
	// 			window.postMessage(JSON.stringify({ type: 'customTeamMsg', curTeam: window.PokeBinCurTeamData }), '*');
	// 		})();
	// 		`;
	// 	}
	// 	(document.head || document.documentElement).appendChild(script);
	// }

	async function process_button(
		e:
			| (SubmitEvent & { currentTarget: EventTarget & HTMLFormElement })
			| null = null,
	) {
		console.info("PROCESSING UPLOAD");
		let ots_element = document.getElementById("ots")! as HTMLInputElement;
		let ots = ots_element.checked;
		if (e) {
			e.preventDefault();
		}
		window.addEventListener("message", async function handler(event) {
			if (event.source === window) {
				try {
					const data = JSON.parse(event.data);
					if (data.type === "customTeamMsg") {
						const current_team = data.curTeam as PokeBinCurTeamData;
						if (current_team.team == "") {
							alert("Please add a Pokemon first!");
							return;
						}

						let password_element = document.getElementById(
							"password",
						)! as HTMLInputElement;
						let password = password_element.value as string;
						let form = document.getElementById(
							"PokeBinForm",
						)! as HTMLFormElement;

						if (password !== "") {
							let content = current_team.team.replaceAll(
								"\\n",
								"\n",
							);

							let jsondata = {
								title: current_team.name,
								author: current_team.author,
								notes: "",
								format: current_team.format,
								rental: "",
							};
							content =
								JSON.stringify(jsondata) +
								"\n-----\n" +
								content;
							// AES encrypt the paste
							let data = await encryptMessage(password, content);
							// Submit the form removing the password

							let hidden_input = document.getElementById(
								"encrypted_data",
							)! as HTMLInputElement;
							hidden_input.value = data;
							form.submit();
						} else {
							let title = document.getElementById(
								"title",
							)! as HTMLInputElement;
							let format = document.getElementById(
								"format",
							)! as HTMLInputElement;
							let author = document.getElementById(
								"author",
							)! as HTMLInputElement;
							let paste = document.getElementById(
								"paste",
							)! as HTMLTextAreaElement;
							title.value = current_team.name;
							format.value = current_team.format;
							author.value = current_team.author;
							paste.value = current_team.team.replaceAll(
								"\\n",
								"\n",
							);

							form.submit();
						}
					}
				} catch (error) {
					console.error("Error parsing message data:", error);
				}
			}
		});

		// injectScript(ots);

		function injectScript(content) {
			const script = document.createElement("script");
			script.textContent = content;
			(document.head || document.documentElement).appendChild(script);
			script.remove();
		}

		injectScript(`
		console.log(window.room)
		`);

		// Get the window.
		// Dispatch a custom event from the content script

		// chrome.runtime.sendMessage({ action: "injectScript", ots: ots });
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
