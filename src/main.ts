import upload from "./upload.svelte";
import pokebin_import from "./import.svelte";
import ots_battle_upload from "./ots_battle_upload.svelte";

let upload_inserted = false;
let import_handled = false;

function processDetails(detailsElement: Element | ChildNode) {
	let textContent = "";
	for (const node of detailsElement.childNodes) {
		// Skip if the node is a <summary> element
		if (node.nodeName.toLowerCase() === "summary") {
			continue;
		}

		// If the node is a text node, add its text
		if (node.nodeType === Node.TEXT_NODE) {
			textContent += node.nodeValue;
		}

		// If the node is a <br>, add a newline
		if (node.nodeName.toLowerCase() === "br") {
			textContent += "\n";
		}
	}

	return textContent;
}

function handle_dom_changes(): void {
	const targetButtonSelector = 'button[name="validate"]';
	const targetButton = document.querySelector(targetButtonSelector);

	const inserted = document.getElementById("pokebin-upload");
	const imported = document.getElementById("pokebin-import");

	if (!inserted) {
		if (targetButton && !upload_inserted) {
			// Target button exists, add the new button if it doesn't already exist
			const pokebinUpload = document.createElement("div");
			pokebinUpload.id = "pokebin-upload";
			new upload({
				target: pokebinUpload,
			});
			targetButton.insertAdjacentElement("afterend", pokebinUpload);
			upload_inserted = true;
		}
	} else {
		upload_inserted = false;
	}

	const import_targetButtonSelector = 'li[class="format-select"]';
	const targetItem = document.querySelector(import_targetButtonSelector);
	if (!imported) {
		if (targetItem && !import_handled) {
			// Target button exists, add the new button if it doesn't already exist
			const pokebinImport = document.createElement("div");
			pokebinImport.id = "pokebin-import";
			new pokebin_import({
				target: pokebinImport,
			});
			targetItem.insertAdjacentElement("beforebegin", pokebinImport);
			import_handled = true;
		}
	} else {
		import_handled = false;
	}

	const details = document.querySelectorAll("div.battle-log details");
	if (details) {
		for (const child of details) {
			const textContent = processDetails(child);
			const summary = child.querySelector("summary");
			if (summary) {
				const user = summary.textContent?.slice("Open Team Sheet for ".length);
				const button_id = `${user}`;
				const existing_button = document.getElementById(button_id);
				if (!existing_button) {
					// Create a button with the button_id
					const otsUpload = document.createElement("div");
					otsUpload.id = button_id;
					new ots_battle_upload({
						target: otsUpload,
						props: {
							author: user,
							text: textContent,
						},
					});
					// Append it to the summary.
					summary.insertAdjacentElement("afterend", otsUpload);
				}
			}
		}
	}
}

const observer: MutationObserver = new MutationObserver(handle_dom_changes);
const config: MutationObserverInit = { childList: true, subtree: true };
observer.observe(document.body, config);
