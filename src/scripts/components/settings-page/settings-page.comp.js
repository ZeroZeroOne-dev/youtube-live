import { Component } from "../../../001-lib/component/component.comp.js";
import { Channel, DataService } from "../../services/data.service.js";
import { YoutubeService } from "../../services/youtube.service.js";
import { SettingsChannelComponent } from "../settings-channel/settings-channel.comp.js";

export class SettingsPageComponent extends Component {
    /** @type {Channel[]} */
    #channels;

    constructor() {
        super({
            template:
                "scripts/components/settings-page/settings-page.comp.html",
            styleSheets: [
                "styles/classes.css",
                "scripts/components/settings-page/settings-page.comp.css",
            ],
        });
    }

    init() {
        this.drawChannels();

        this.getChild("#add-btn").addEventListener("click", () => {
            const handle = this.getChild("#handle-input").value;
            YoutubeService.getChannelIdForHandle(handle).then((id) => {
                DataService.storeChannels([...this.#channels, { handle, id }]);
                this.drawChannels();
                void YoutubeService.refresh();
            });
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
}
customElements.define("ytl-settings-page", SettingsPageComponent);
