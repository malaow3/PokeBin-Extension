import { createSignal, onCleanup } from "solid-js";

import { render } from "solid-js/web";
import Upload from "./Upload";
import PokebinImport from "./Import";
import OtsBattleUpload from "./OtsBattleUpload";

function processDetails(detailsElement: Element | ChildNode) {
    let textContent = "";
    const children = detailsElement.childNodes;
    for (let i = 0; i < children.length; i++) {
        const node = children[i];
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

function App() {
    const [mutations, setMutations] = createSignal<MutationRecord[]>([]);

    const observer = new MutationObserver((mutationsList) => {
        setMutations(mutationsList);
    });

    const config: MutationObserverInit = { childList: true, subtree: true };
    observer.observe(document.body, config);

    onCleanup(() => {
        observer.disconnect();
    });

    const handleDomChanges = () => {
        for (const mutation of mutations()) {
            if (mutation.type === "childList") {
                const addedNodes = mutation.addedNodes;
                for (let i = 0; i < addedNodes.length; i++) {
                    const node = addedNodes[i];
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
                            render(() => <Upload />, pokebinUpload);
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
                            render(() => <PokebinImport />, pokebinImport);
                            targetItem.insertAdjacentElement("beforebegin", pokebinImport);
                        }

                        const details = (node as Element).querySelectorAll(
                            "div.battle-log details",
                        );
                        for (let j = 0; j < details.length; j++) {
                            const child = details[j];
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
                                    render(
                                        () => <OtsBattleUpload author={user} text={textContent} />,
                                        otsUpload,
                                    );
                                    summary.insertAdjacentElement("afterend", otsUpload);
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    return <>{handleDomChanges()}</>;
}

render(() => <App />, document.body);
