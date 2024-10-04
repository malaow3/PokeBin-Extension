import { createSignal } from "solid-js";
import { encryptMessage } from "./helpers";

// @ts-ignore
const usfw = unsafeWindow;

const RE_HEAD =
    /^(?:(.* \()([A-Z][a-z0-9:']+\.?(?:[- ][A-Za-z][a-z0-9:']*\.?)*)(\))|([A-Z][a-z0-9:']+\.?(?:[- ][A-Za-z][a-z0-9:']*\.?)*))(?:( \()([MF])(\)))?(?:( @ )([A-Z][a-z0-9:']*(?:[- ][A-Z][a-z0-9:']*)*))?( *)$/;

function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    );
}

function fixTeams(team: string): string {
    // First, split the team on the double newline.
    const split = team.split("\n\n");
    for (let i = 0; i < split.length; i++) {
        if (split[i] === "") {
            continue;
        }
        const team = split[i];
        let header = team.split("\n")[0];
        if (!header.match(RE_HEAD)) {
            // Get the name of the pokemon.
            const name = header.split(" ")[0];
            const rest = header.split(" ").slice(1).join(" ");
            const species = toTitleCase(name);
            header = `${name} (${species}) ${rest}`;
            split[i] = `${header}\n${team.split("\n").slice(1).join("\n")}`;
        }
    }
    return split.join("\n\n");
}

const Upload = () => {
    const [ots, setOts] = createSignal(false);
    const [password, setPassword] = createSignal("");

    const onkey = async (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            await process_button();
        }
    };

    const process_button = async (e?: Event) => {
        if (e) {
            e.preventDefault();
        }
        console.info(usfw.room);
        console.info(usfw.room.curTeam);
        if (usfw.room.curTeam.team.length === 0) {
            alert("No team selected.");
            return;
        }

        const name = usfw.room.curTeam.name;
        const format = usfw.room.curTeam.format;
        const gen = usfw.room.curTeam.gen;
        let team = usfw.Storage.exportTeam(usfw.room.curTeam.team, gen, ots());
        const author = usfw.app.user.attributes.name;
        team = fixTeams(team);

        const form = document.getElementById("PokeBinForm") as HTMLFormElement;

        if (password() !== "") {
            let content = team.replaceAll("\\n", "\n");

            const jsondata = {
                title: name,
                author: author,
                notes: "",
                format: format,
                rental: "",
            };
            content = `${JSON.stringify(jsondata)}\n-----\n${content}`;
            // AES encrypt the paste
            const data = await encryptMessage(password(), content);
            // Submit the form removing the password

            const hidden_input = document.getElementById(
                "encrypted_data",
            ) as HTMLInputElement;
            hidden_input.value = data;
        } else {
            const title_element = document.getElementById(
                "title",
            ) as HTMLInputElement;
            const format_element = document.getElementById(
                "format",
            ) as HTMLInputElement;
            const author_element = document.getElementById(
                "author",
            ) as HTMLInputElement;
            const paste_element = document.getElementById(
                "paste",
            ) as HTMLTextAreaElement;
            title_element.value = name;
            format_element.value = format;
            author_element.value = author;
            paste_element.value = team.replaceAll("\\n", "\n");
        }
        form.submit();
    };

    return (
        <main>
            <br />
            <div class="group">
                <form
                    id="PokeBinForm"
                    method="post"
                    action="https://pokebin.com/create"
                    target="_blank"
                    class="form-row"
                    onSubmit={process_button}
                >
                    <button class="button" type="submit">
                        Upload to PokeBin
                    </button>
                    <label for="ots">
                        <input
                            type="checkbox"
                            id="ots"
                            checked={ots()}
                            onChange={(e) => setOts(e.currentTarget.checked)}
                        />
                        OTS
                    </label>
                    <input
                        onKeyDown={onkey}
                        class="custom-input"
                        type="password"
                        id="password"
                        placeholder="Enter a password"
                        value={password()}
                        onInput={(e) => setPassword(e.currentTarget.value)}
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
            <style>{`
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
      `}</style>
        </main>
    );
};

export default Upload;
