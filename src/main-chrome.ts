import upload from "./upload-chrome.svelte";
import pokebin_import from "./import-chrome.svelte";

let upload_inserted = false;
let import_handled = false;

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
}

const observer: MutationObserver = new MutationObserver(handle_dom_changes);
const config: MutationObserverInit = { childList: true, subtree: true };
observer.observe(document.body, config);
