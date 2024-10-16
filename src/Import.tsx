import { createSignal } from "solid-js";
import { match } from "ts-pattern";
import { decryptMessage } from "./helpers";

// @ts-ignore
const usfw = unsafeWindow;

const Import = () => {
    const [importUrl, setImportUrl] = createSignal("");
    const [password, setPassword] = createSignal("");

    const onkey = async (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            await submit();
        }
    };

    const submit = async () => {
        if (importUrl() === "") {
            alert("You must enter some text to import.");
            return;
        }

        const url = importableUrl(importUrl());
        if (url === "") {
            alert("Not a valid PokeBin URL");
            return;
        }

        const response = await fetch(url);
        const response_data = await response.json();

        if (response_data.encrypted_data && password() === "") {
            alert("You need to enter a password to import.");
            return;
        }
        if (response_data.encrypted_data && password() !== "") {
            const decrypted = await decryptMessage(
                password(),
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
    };

    const importableUrl = (value: string): string => {
        if (!value.startsWith("https://pokebin.com/")) {
            throw new Error("Not a valid PokeBin URL");
        }
        let new_value = value;
        if (!value.endsWith("/json")) {
            if (!value.endsWith("/")) {
                new_value = `${value}/json`;
            } else {
                new_value = `${value}json`;
            }
        }
        return new_value;
        // const match = value.match(/^https?:\/\/(pokebin\.com)\/(.*)\s*$/);
        // if (!match) return "";
        // const path = match[2];
        // return `https://pokebin.com/${path.replace(/\/.*/, "")}/json`;
    };

    return (
        <main>
            <input
                onKeyDown={onkey}
                id="import-url"
                class="custom-input custom-input-import"
                type="url"
                placeholder="Enter PokeBin URL"
                value={importUrl()}
                onInput={(e) => setImportUrl(e.currentTarget.value)}
            />
            <input
                onKeyDown={onkey}
                class="custom-input custom-password"
                type="password"
                id="password-import"
                placeholder="Enter a password"
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
            />
            <button type="submit" class="button" onClick={submit}>
                Import from PokeBin
            </button>

            <style>{`
        .custom-input-import {
          width: 250px;
        }
      `}</style>
        </main>
    );
};

export default Import;
