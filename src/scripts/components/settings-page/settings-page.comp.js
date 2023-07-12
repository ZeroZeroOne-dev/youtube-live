import { Component } from "../../../001-lib/component/component.comp.js";
import { Channel, DataService } from "../../services/data.service.js";
import { YoutubeService } from "../../services/youtube.service.js";
import { SettingsChannelComponent } from "../settings-channel/settings-channel.comp.js";

export class SettingsPageComponent extends Component {
    /** @type {Channel[]} */
    #channels;

    /** @type {HTMLInputElement} */
    #input;

    /** @type {HTMLDivElement} */
    #error;

    /** @type {number} */
    #clearErrorTimeout;

    constructor() {
        super({
            template: "scripts/components/settings-page/settings-page.comp.html",
            styleSheets: ["styles/classes.css", "scripts/components/settings-page/settings-page.comp.css"],
        });
    }

    init() {
        this.#input = this.getChild("#handle-input");
        this.#error = this.getChild(".error");
        this.drawChannels();

        this.getChild("#add-btn").addEventListener("click", () => {
            /** @type {string} */
            let query = this.#input.value;
            query = query.startsWith("@") ? query : `@${query}`;
            query = query.toLowerCase();

            if (query.length <= 1) return;

            if (this.#channels.some((c) => c.handle === query)) {
                this.showError(`A channel with the handle ${query} is already in the list.`);
                return;
            }

            YoutubeService.getChannelIdAndHandleForQuery(query)
                .then((result) => {
                    if (result.handle !== query) throw new Error(`query (${query}) and result (${result.handle}) do not match.`);

                    return result;
                })
                .then(({ handle, id }) => this.storeChannel(handle, id))
                .catch(() => this.showError(`A channel with the handle ${query} was not found`));
        });
    }

    drawChannels() {
        this.#channels = DataService.readChannelList();

        const listComp = this.getChild(".channel-list");

        listComp.replaceChildren();

        this.#channels.forEach((channel, index) => {
            listComp.appendChild(
                new SettingsChannelComponent(channel, () => {
                    this.#channels.splice(index, 1);
                    DataService.storeChannels(this.#channels);
                    this.drawChannels();
                    void YoutubeService.refresh();
                })
            );
        });
    }

    storeChannel(handle, id) {
        DataService.storeChannels([...this.#channels, { handle, id }]);
        this.#input.value = "";
        this.drawChannels();
        void YoutubeService.refresh();
    }

    showError(message) {
        this.#error.innerText = message;
        this.#error.style.display = "block";
        clearTimeout(this.#clearErrorTimeout);
        this.#clearErrorTimeout = setTimeout(() => {
            this.#error.style.display = "";
        }, 2000);
    }
}
customElements.define("ytl-settings-page", SettingsPageComponent);
