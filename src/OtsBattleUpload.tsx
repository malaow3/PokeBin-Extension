import { createSignal } from "solid-js";

interface OtsBattleUploadProps {
    text: string;
    author: string;
}

const OtsBattleUpload = (props) => {
    const [text] = createSignal(props.text);
    const [author] = createSignal(props.author);

    const ots_process_button = async (e: Event) => {
        e.preventDefault();
        if (!text() || !author()) {
            console.warn("Missing text or author information. Cannot submit form.");
            return;
        }
        let form = document.getElementById("OTSPokeBinForm") as HTMLFormElement;

        let title = form.elements.namedItem("title") as HTMLInputElement;
        title.value = `${author()}'s OTS`;
        let paste = form.elements.namedItem("paste") as HTMLTextAreaElement;
        paste.value = text();
        let author_input = form.elements.namedItem("author") as HTMLInputElement;
        author_input.value = author();
        let format_input = form.elements.namedItem("format") as HTMLInputElement;
        format_input.value = "";
        let rental_input = form.elements.namedItem("rental") as HTMLInputElement;
        rental_input.value = "";
        let notes_input = form.elements.namedItem("notes") as HTMLTextAreaElement;
        notes_input.value = "";
        let encrypt_input = form.elements.namedItem(
            "encrypted_data",
        ) as HTMLInputElement;
        encrypt_input.value = "";

        form.submit();
    };

    return (
        <main>
            <br />
            <div class="group">
                <form
                    id="OTSPokeBinForm"
                    method="post"
                    action="https://pokebin.com/create"
                    target="_blank"
                    class="form-row"
                    onSubmit={ots_process_button}
                >
                    <button class="button" type="submit">
                        Upload to PokeBin
                    </button>
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

export default OtsBattleUpload;
