import upload from "./upload.svelte";
import pokebin_import from "./import.svelte";
import ots_battle_upload from "./ots_battle_upload.svelte";

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

function handle_dom_changes(mutations: MutationRecord[]): void {
	for (const mutation of mutations) {
		if (mutation.type === "childList") {
			const addedNodes = mutation.addedNodes;
			for (const node of addedNodes) {
				if (node.nodeType === Node.ELEMENT_NODE) {
					const targetButton = (node as Element).querySelector(
						'button[name="validate"]',
					);
					if (
						targetButton &&
						!targetButton.nextElementSibling?.id.includes("pokebin-upload")
					) {
						const pokebinUpload = document.createElement("div");
						pokebinUpload.id = "pokebin-upload";
						new upload({
							target: pokebinUpload,
						});
						targetButton.insertAdjacentElement("afterend", pokebinUpload);
					}

					const targetItem = (node as Element).querySelector(
						'li[class="format-select"]',
					);
					if (
						targetItem &&
						!targetItem.previousElementSibling?.id.includes("pokebin-import")
					) {
						const pokebinImport = document.createElement("div");
						pokebinImport.id = "pokebin-import";
						new pokebin_import({
							target: pokebinImport,
						});
						targetItem.insertAdjacentElement("beforebegin", pokebinImport);
					}

					const details = (node as Element).querySelectorAll(
						"div.battle-log details",
					);
					for (const child of details) {
						const textContent = processDetails(child);
						const summary = child.querySelector("summary");

						if (summary) {
							const user = summary.textContent?.slice(
								"Open Team Sheet for ".length,
							);
							const button_id = `${user}`;
							const existing_button = child.querySelector(`#${button_id}`);

							if (!existing_button) {
								const otsUpload = document.createElement("div");
								otsUpload.id = button_id;
								new ots_battle_upload({
									target: otsUpload,
									props: {
										author: user,
										text: textContent,
									},
								});
								summary.insertAdjacentElement("afterend", otsUpload);
							}
						}
					}
				}
			}
		}
	}
}

const observer: MutationObserver = new MutationObserver(handle_dom_changes);
const config: MutationObserverInit = { childList: true, subtree: true };
observer.observe(document.body, config);
